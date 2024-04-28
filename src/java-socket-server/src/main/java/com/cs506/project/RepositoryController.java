package com.cs506.project;

import com.cs506.project.repos.AirplaneRepository;
import com.cs506.project.repos.ComponentRepository;
import com.cs506.project.repos.FacilityRepository;
import com.cs506.project.schemas.AirplaneSchema;
import com.cs506.project.schemas.ComponentSchema;
import com.cs506.project.schemas.FacilitySchema;
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

        AirplaneRepository repository = new AirplaneRepository(null);

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
        ComponentRepository repository = new ComponentRepository(null);

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
        FacilityRepository repository = new FacilityRepository(null);
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

                    if (responseAirplanes == null) {
                        response = formResponse(null);
                    } else{
                        response = formResponse(gson.toJson(responseAirplanes));
                    }
                    break;

                case "Component":
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

}
