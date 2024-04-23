package com.cs506.project.server;

import com.cs506.project.configs.WorkerConfig;
import com.cs506.project.utils.SocketIO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.io.PrintStream;
import java.net.Socket;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CountDownLatch;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProxyServerWorkerTest {

    @Mock
    private WorkerConfig config;

    @Mock
    private BlockingQueue<Socket> workQueue;

    @Mock
    private PrintStream logger;

    @Mock
    private ProxyServerTask task;

    @Mock
    private Socket client;

    private ProxyServerWorker worker;

    @BeforeEach
    public void setUp() throws IOException {
        MockitoAnnotations.initMocks(this);
        when(config.timeout()).thenReturn(1000);
        when(config.chunkSize()).thenReturn(1024);
        when(workQueue.take()).thenReturn(client);
        worker = new ProxyServerWorker(config, workQueue, logger);
        worker.setTask(task);
    }

    @Test
    public void testStart() {
        worker.start();
        assertTrue(worker.isActive());
    }

    @Test
    public void testRun() throws IOException {
        // Start the worker in a new thread
        new Thread(worker).start();

        // Verify that a client was retrieved from the queue
        verify(workQueue, timeout(1000)).take();

        // Verify that the socket timeout was set
        verify(client, timeout(1000)).setSoTimeout(anyInt());

        // Verify that the task was executed
        verify(task, timeout(1000)).handle(any());
    }

    @Test
    public void testStop() throws IOException {
        // Start the worker in a new thread
        new Thread(worker).start();
        worker.stop();

        assertFalse(worker.isActive());
        // Verify that the client socket was closed
        verify(client, timeout(1000)).close();
    }
}
