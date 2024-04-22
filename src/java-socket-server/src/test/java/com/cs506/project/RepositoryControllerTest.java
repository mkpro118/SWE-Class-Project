package com.cs506.project;

import com.cs506.project.schemas.SocketServerRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.spy;

public class RepositoryControllerTest {

    @Mock
    private RepositoryController mockRepositoryController;

    @BeforeEach
    public void setUp () {

        MockitoAnnotations.openMocks(this);

        RepositoryController controller = new RepositoryController();
        mockRepositoryController = spy(controller);

    }

    @Test
    public void testCreateSocketServerRequest () {

        String request = "{\n" +
                "  \"type\": \"CREATE\",\n" +
                "  \"entityName\": \"Airplane\",\n" +
                "  \"limit\": 0,\n" +
                "  \"requestingAllDetails\": \"true\",\n" +
                "  \"entities\": []\n" +
                "}";

        Object ans = mockRepositoryController.createSocketServerRequest(request.getBytes());

        assertTrue(ans instanceof SocketServerRequest);

        assertEquals(((SocketServerRequest) ans).type, "CREATE");
        assertEquals(((SocketServerRequest) ans).entityName, "Airplane");
        assertEquals(((SocketServerRequest) ans).limit, 0);
        assertEquals(((SocketServerRequest) ans).requestingAllDetails, true);
        assertEquals(((SocketServerRequest) ans).entities.size(), 0);

    }

}
