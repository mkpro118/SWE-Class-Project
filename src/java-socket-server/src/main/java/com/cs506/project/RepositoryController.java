package com.cs506.project;

import com.cs506.project.repos.AirplaneRepository;
import com.cs506.project.repos.ComponentRepository;
import com.cs506.project.schemas.AirplaneSchema;
import com.cs506.project.schemas.ComponentSchema;
import com.cs506.project.schemas.SocketServerRequest;
import jdk.net.Sockets;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import com.google.gson.Gson;

/**
 * Controller class that controls which SQL repository handles an incoming request.
 */
public class RepositoryController {

    private JDBCConnection jdbcConnection;

    private static final Gson gson = new Gson();

    public RepositoryController () {
        jdbcConnection = createConnection();
    }

    /**
     * Creates a JDBC Connection to be passed to the appropriate SQL repository.
     *
     * @return JDBCConnection object.
     */
    private JDBCConnection createConnection () {
        return new JDBCConnection();
    }

    private SocketServerRequest createSocketServerRequest (byte[] request) {
        try {

            ByteArrayInputStream bis = new ByteArrayInputStream(request);
            ObjectInputStream ois = new ObjectInputStream(bis);
            Object obj = ois.readObject();
            ois.close();

            return (SocketServerRequest) obj;

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Creates a Socket Server Response to give to the Web Server.
     *
     * @param responseEntities : Schema of entity queried.
     * @return JSON Response as string.
     */
    private String formResponse (String responseEntities) {

        if (responseEntities == null) {
            // Error Response created here.
        }

        if (responseEntities == "") {
            // This is if none of the cases were hit in the main switch: Error
        }

        return null;
    }

    /**
     * Chooses which method to run within the Airplane SQL Repository.
     *
     * @param requestAirplanes : List of Airplanes
     * @return List of Airplane Objects (even if one is just requested).
     */
    private List<AirplaneSchema> handleAirplaneRequest (String action, int limit, boolean readAll,
                                                        List<AirplaneSchema> requestAirplanes) throws SQLException {

        AirplaneRepository repository = new AirplaneRepository(jdbcConnection);

        List<AirplaneSchema> result = null;

        switch (action) {

            case "CREATE":
                result = repository.handleCreateQuery(requestAirplanes);
                break;

            case "READ":
                result = repository.handleReadQuery(limit, readAll, requestAirplanes);
                break;

            case "UPDATE":
                result = repository.handleUpdateQuery(requestAirplanes);
                break;

            case "DELETE":
                result = repository.handleDeleteQuery(requestAirplanes);
                break;

            default:
                // Error Case
                break;
        }

        return result;
    }

    /**
     * Chooses which method to run within the Airplane SQL Repository.
     *
     * @param requestComponents : List of Components
     * @return List of Airplane Objects (even if one is just requested).
     */
    private List<ComponentSchema> handleComponentRequest (String action, int limit, boolean readAll,
                                                          List<ComponentSchema> requestComponents) throws SQLException {

        ComponentRepository repository = new ComponentRepository(jdbcConnection);

        List<ComponentSchema> result = null;

        switch (action) {

            case "CREATE":
                result = repository.handleCreateQuery(requestComponents);
                break;

            case "READ":
                result = repository.handleReadQuery(limit, readAll, requestComponents);
                break;

            case "UPDATE":
                result = repository.handleUpdateQuery(requestComponents);
                break;

            case "DELETE":
                result = repository.handleDeleteQuery(requestComponents);
                break;

            default:
                // Error Case
                break;
        }

        return result;
    }

    /**
     * Contains master SQL repository controller switch to dictate which repository handles the incoming request.
     *
     * @param request : byte[] of incoming socket server request
     * @return JSON Response as string.
     */
    public String handleRequest (byte[] request) {

        SocketServerRequest ssrequest = createSocketServerRequest(request);

        if (ssrequest == null) {
            return formResponse(null);
        }

        String response = "";

        try {

            switch (ssrequest.entityName) {

                case "Airplane":
                    List<AirplaneSchema> airplanes = ssrequest.entities.stream()
                            .map(obj -> (AirplaneSchema) obj)
                            .collect(Collectors.toList());
                    List<AirplaneSchema> responseAirplanes = handleAirplaneRequest(ssrequest.type, ssrequest.limit,
                            ssrequest.requestingAllDetails ,airplanes);

                    response = formResponse(gson.toJson(responseAirplanes));

                case "Component":
                    List<ComponentSchema> components = ssrequest.entities.stream()
                            .map(obj -> (ComponentSchema) obj)
                            .collect(Collectors.toList());
                    List<ComponentSchema> responseComponent = handleComponentRequest(ssrequest.type, ssrequest.limit,
                            ssrequest.requestingAllDetails, components);

                    response = formResponse(gson.toJson(responseComponent));

                default:
                    response = formResponse("");
                    break;

            }

        } catch(SQLException ex){
            // Error Response
            ex.printStackTrace();
        }

        return response;
    }

}
