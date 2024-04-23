package com.cs506.project.server;

import com.cs506.project.configs.ListenerConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CountDownLatch;

import static org.mockito.Mockito.*;

public class ProxyServerListenerTest {

    @Mock
    private ListenerConfig config;

    @Mock
    private BlockingQueue<Socket> workQueue;

    @Mock
    private PrintStream logger;

    private ProxyServerListener listener;

    @BeforeEach
    public void setUp() throws IOException {
        MockitoAnnotations.initMocks(this);
        when(config.port()).thenReturn(8080);
        listener = new ProxyServerListener(config, workQueue, logger);
    }

    @AfterEach
    public void tearDown() throws IOException {
        listener.stop();
    }

    @Test
    public void testStart() throws IOException {
        listener.start();
        verify(logger).println("Bound to port " + config.port());
    }

    @Test
    public void testStop() throws IOException {
        listener.start();
        listener.stop();
        verify(logger).println(anyString() + " going down!");
    }

    @Test
    public void testServerSocketIsUp() throws IOException {
        // Start the listener in a new thread
        new Thread(listener).start();

        try {
            // Try to connect to the server
            Socket clientSocket = new Socket("localhost", 8080);

            // Check if the connection was successful
            assertTrue(clientSocket.isConnected());
            clientSocket.close();
        } catch (IOException e) {
            fail("Failed to connect to the server", e);
        }
    }

    @Test
    public void testBlockingQueueReceivesClientSockets()
        throws IOException, InterruptedException {
        // Start the listener in a new thread
        new Thread(listener).start();

        Socket mockSocket = mock(Socket.class);

        new Thread(() -> {
            try {
                // Try to connect to the server
                Socket clientSocket = new Socket("localhost", 8080);

                // Check if the connection was successful
                assertTrue(clientSocket.isConnected());

                clientSocket.close();
            } catch (IOException e) {
                fail("Failed to connect to the server", e);
            }
        }).start(); // Start a new thread that connects to the server

        // Wait for the client to start and establish the connection
        Thread.sleep(1000);

        // Verify that a socket was added to the queue
        verify(workQueue).put(mockSocket);
    }
}
