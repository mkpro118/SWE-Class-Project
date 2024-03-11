import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;
import java.net.Socket;
import java.net.ServerSocket;
import java.net.InetSocketAddress;
import java.io.IOException;
import java.io.InputStream;

public class JavaServer {
  public static void main(String[] args) {
    Map<String, String> map = new HashMap<>();

    (new Thread(() -> {
        try {
            // Timeout in a minute
            Thread.sleep(60000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Shutting down the server!");
        System.exit(0);
    })).start();

    try (ServerSocket socket = new ServerSocket()) {
      socket.bind(new InetSocketAddress(8000));

      System.out.println("Server up!");
      try (Socket client = socket.accept()) {
        System.out.println("Client found!");

        InputStream os = client.getInputStream();
        byte[] arr = new byte[1000];
        int len;
        do {
          if ((len = os.read(arr)) < 0)
              break;

          String[] parts = new String(Arrays.copyOf(arr, len)).split("-");

          if (parts.length != 2) {
            System.out.println("Bad Parse ... Dropped!");
            continue;
          }

          map.put(parts[0], parts[1]);
          System.out.println(map);
        } while(client.isConnected());
      }
    } catch (IOException e) {
      e.printStackTrace(System.err);
    }
    System.out.println("Stopping Server!");
  }
}
