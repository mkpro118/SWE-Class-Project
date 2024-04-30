package com.cs506.project;

import com.cs506.project.repos.AirplaneRepository;
import com.cs506.project.repos.ComponentRepository;
import com.cs506.project.repos.FacilityRepository;
import com.cs506.project.schemas.AirplaneSchema;
import com.cs506.project.schemas.ComponentSchema;
import com.cs506.project.schemas.FacilitySchema;
import com.cs506.project.schemas.SocketServerRequest;
import jdk.net.Sockets;
import java.sql.*;

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

    private Connection conn;

    private static final Gson gson = new Gson();

    private static final String sql_host = System.getenv().getOrDefault("SQL_SERVER_HOST", "localhost");

    private static final String sql_port = System.getenv().getOrDefault("SQL_SERVER_PORT", "3306");

   public RepositoryController () {
        createConnection();
    }

    /**
     * Creates a JDBC Connection to be passed to the appropriate SQL repository.
     *
     * @return JDBCConnection object.
     */
    private void createConnection () {
        try {
            conn = DriverManager.getConnection("jdbc:mysql://" + sql_host + ":" + sql_port + "/appdb", "root", "pass");
        } catch (SQLException e){
            e.printStackTrace();
        }
        ;
    }

    public SocketServerRequest createSocketServerRequest (byte[] request) {
        try {

            String jsonString = new String(request);

            SocketServerRequest result = gson.fromJson(jsonString, SocketServerRequest.class);

            return result;

        } catch (Exception e) {
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

        String response = "";
        if (responseEntities == null) {
            response = "{\n" +
                    "  \"entities\": [],\n" +
                    "  \"error\": \"There was an issue processing your request. Ensure your request is a valid SocketServerRequest.\"\n" +
                    "}";
        } else {
            response = "{\n" +
                    "  \"entities\":" + responseEntities + ",\n" +
                    "  \"error\": \"\"\n" +
                    "}";
        }

        return response;
    }

    /**
     * Chooses which method to run within the Airplane SQL Repository.
     *
     * @param requestAirplanes : List of Airplanes
     * @return List of Airplane Objects (even if one is just requested).
     */
    private List<AirplaneSchema> handleAirplaneRequest (String action, int limit, boolean readAll,
                                                        List<AirplaneSchema> requestAirplanes) throws SQLException {

        AirplaneRepository repository = new AirplaneRepository(conn);

        List<AirplaneSchema> result = null;

        switch (action) {

            case "CREATE":
                result = repository.handleCreateQuery(requestAirplanes);
                break;

            case "READ":
                System.out.println("Airplane Read Request Received");
                result = repository.handleReadQuery(limit, readAll, requestAirplanes);
                System.out.println("Airplane Read Response: " + result.toString());
                break;

            case "UPDATE":
                result = repository.handleUpdateQuery(requestAirplanes);
                break;

            case "DELETE":
                result = repository.handleDeleteQuery(requestAirplanes);
                break;

            default:
                break;
        }

        return result;
    }

    /**
     * Chooses which method to run within the Components SQL Repository.
     *
     * @param requestComponents : List of Components
     * @return List of Component Objects (even if one is just requested).
     */
    private List<ComponentSchema> handleComponentRequest (String action, int limit, boolean readAll,
                                                          List<ComponentSchema> requestComponents) throws SQLException {

        // Call JDBCConnection.create before
        ComponentRepository repository = new ComponentRepository(conn);

        List<ComponentSchema> result = null;

        switch (action) {

            case "CREATE":
                result = repository.handleCreateQuery(requestComponents);
                break;

            case "READ":
                System.out.println("Component Read Request Received");
                result = repository.handleReadQuery(limit, readAll, requestComponents);
                System.out.println("Component Read Response: " + result.toString());
                break;

            case "UPDATE":
                result = repository.handleUpdateQuery(requestComponents);
                break;

            case "DELETE":
                result = repository.handleDeleteQuery(requestComponents);
                break;

            default:
                break;
        }

        return result;
    }

    /**
     * Chooses which method to run within the Facility SQL Repository.
     *
     * @param requestFacilities : List of Components
     * @return List of Facility Objects (even if one is just requested).
     */
    public List<FacilitySchema> handleFacilityRequest (String action, int limit, boolean readAll,
                                                        List<FacilitySchema> requestFacilities) throws SQLException {
        FacilityRepository repository = new FacilityRepository(conn);
        List<FacilitySchema> result = null;
        switch (action) {
            case "CREATE":
                result = repository.handleCreateQuery(requestFacilities);
                break;
            case "READ":
                result = repository.handleReadQuery(limit, readAll, requestFacilities);
                break;

            case "UPDATE":
                result = repository.handleUpdateQuery(requestFacilities);
                break;

            case "DELETE":
                result = repository.handleDeleteQuery(requestFacilities);
                break;

            case "ADD":
                result = repository.handleAddFacility(requestFacilities);

            default:
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

        System.out.println("Request Received!");

        SocketServerRequest ssrequest = createSocketServerRequest(request);

        System.out.println("SocketServerRequest Received: " + ssrequest.entityName + " " + ssrequest.type + " " +ssrequest.entities );

        if (ssrequest == null) {
            return formResponse(null);
        }

        String response = "";

        try {

            switch (ssrequest.entityName) {

                case "Airplane":
                    System.out.println("Airplane Request Received");
                    List<AirplaneSchema> airplanes = ssrequest.entities.stream()
                            .map(obj -> (AirplaneSchema) obj)
                            .collect(Collectors.toList());

                    System.out.println("Calling handle method for Airplane Request...");
                    List<AirplaneSchema> responseAirplanes = handleAirplaneRequest(ssrequest.type, ssrequest.limit,
                            ssrequest.requestingAllDetails ,airplanes);

                    if (responseAirplanes == null) {
                        response = formResponse(null);
                    } else{
                        response = formResponse(gson.toJson(responseAirplanes));
                    }
                    break;

                case "Component":
                    System.out.println("Component Request Received");
                    List<ComponentSchema> components = ssrequest.entities.stream()
                            .map(obj -> (ComponentSchema) obj)
                            .collect(Collectors.toList());
                    List<ComponentSchema> responseComponents = handleComponentRequest(ssrequest.type, ssrequest.limit,
                            ssrequest.requestingAllDetails, components);

                    if (responseComponents == null){
                        response = formResponse(null);
                    } else {
                        response = formResponse(gson.toJson(responseComponents));
                    }
                    break;

                case "Facility":
                    List<FacilitySchema>  facilities = ssrequest.entities.stream()
                            .map(obj -> (FacilitySchema) obj)
                            .collect(Collectors.toList());
                    List<FacilitySchema> responseFacilities = handleFacilityRequest(ssrequest.type, ssrequest.limit,
                            ssrequest.requestingAllDetails,facilities);
                    if (responseFacilities == null){
                        response = formResponse(null);
                    } else {
                        response = formResponse(gson.toJson(responseFacilities));
                    }
                    break;

                default:
                    response = formResponse(null);
                    break;

            }

        } catch(Exception ex){
            ex.printStackTrace();
            return formResponse(null);
        }

        return response;
    }

    public static void main (String[] arg) {

        RepositoryController controller = new RepositoryController();

        String request = "{\n" +
                "  \"type\": \"READ\",\n" +
                "  \"entityName\": \"Airplane\",\n" +
                "  \"limit\": -1,\n" +
                "  \"requestingAllDetails\": \"true\",\n" +
                "  \"entities\": []\n" +
                "}";

        var response = controller.handleRequest(request.getBytes());

        System.out.println("Response Given: " + response);
    }

}
