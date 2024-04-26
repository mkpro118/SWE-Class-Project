package com.cs506.project.repos;

import com.cs506.project.JDBCConnection;
import com.cs506.project.interfaces.ISQLRepository;
import com.cs506.project.schemas.FacilitySchema;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
public class FacilityRepository implements ISQLRepository<FacilitySchema>{
    private Connection connection;

    public FacilityRepository (Connection connection) throws SQLException {
        this.connection = connection;
    }

    /**
     * The basic details will get the ID, City, and State columns
     *
     * @return List of Facility Java Objects with only the basic details
     * */
    @Override
    public List<FacilitySchema> getAllWithBasicDetails(int limit) throws SQLException {
        List<FacilitySchema> facilites = new ArrayList<>();
        String query = "";
        if (limit != -1) {
            query = "SELECT FacilityID, city, state FROM Facility LIMIT" + limit;
        } else {
            query = "SELECT FacilityID, city, state FROM Facility";
        }
        try(Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query)){
            while(resultSet.next()){
                FacilitySchema facilitySchema = new FacilitySchema();

                facilitySchema.facilityId = resultSet.getInt("FacilityID");
                facilitySchema.city = resultSet.getString("City");
                facilitySchema.state = resultSet.getString("State");

                facilites.add(facilitySchema);
            }
        }
        return facilites;
    }

    /**
     * Fetches all rows and columns in the Facility table.
     *
     * @return List of Facility Java Objects.
     */
    @Override
    public List<FacilitySchema> getAllWithAllDetails(int limit) throws SQLException {
        List<FacilitySchema> facilities = new ArrayList<>();
        String query = "";
        if(limit != -1){
            query = "SELECT * FROM Facility Limit" + limit;
        } else {
            query = "SELECT * FROM Facility";
        }

        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(query)) {
            while (resultSet.next()) {

                FacilitySchema facilitySchema= new FacilitySchema();

                facilitySchema.facilityId = resultSet.getInt("FacilityID");
                facilitySchema.name = resultSet.getString("Name");
                facilitySchema.city = resultSet.getString("City");
                facilitySchema.state = resultSet.getString("State");
                facilitySchema.description = resultSet.getString("Description");
                facilitySchema.componentsInProduction = resultSet.getInt("ComponentsInProduction");
                facilitySchema.componentsCompleted= resultSet.getInt("ComponentsCompleted");
                facilitySchema.modelsInProduction = resultSet.getInt("ModelsInProduction");
                facilitySchema.modelsCompleted = resultSet.getInt("ModelsCompleted");
                facilitySchema.employeeCount = resultSet.getInt("EmployeeCount");
                facilitySchema.managerId = resultSet.getInt("ManagerID");

                facilities.add(facilitySchema);
            }
        }

        return facilities;
    }

    /**
     * Fetches an all data for Facility based on the id passed.
     *
     * @param facilityId : Id of the Facility queried.
     * @return Facility Java Object.
     */
    @Override
    public List<FacilitySchema> getById(int facilityId) throws SQLException{
        List<FacilitySchema> facility = new ArrayList<>();

        String query = "SELECT * FROM Facility WHERE facilityId = " + facilityId;
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(query);){

            while (resultSet.next()) {

                FacilitySchema facilitySchema = new FacilitySchema();

                facilitySchema.facilityId = resultSet.getInt("FacilityID");
                facilitySchema.name = resultSet.getString("Name");
                facilitySchema.city = resultSet.getString("City");
                facilitySchema.state = resultSet.getString("State");
                facilitySchema.description = resultSet.getString("Description");
                facilitySchema.componentsInProduction = resultSet.getInt("ComponentsInProduction");
                facilitySchema.componentsCompleted= resultSet.getInt("ComponentsCompleted");
                facilitySchema.modelsInProduction = resultSet.getInt("ModelsInProduction");
                facilitySchema.modelsCompleted = resultSet.getInt("ModelsCompleted");
                facilitySchema.employeeCount = resultSet.getInt("EmployeeCount");
                facilitySchema.managerId = resultSet.getInt("ManagerID");

                facility.add(facilitySchema);

            }
        }

        return facility;
    }

    /**
     * Takes a Create query and funnels it to the appropriate method within class.
     *
     * @param requestEntities : List of Facilities to create in database
     * @return
     *
     * */
    @Override
    public List<FacilitySchema> handleCreateQuery(List<FacilitySchema> requestEntities) throws SQLException {
        closeConnection();
        return null;
    }

    /**
     * Handles a Read query and sends it to the correct method within class.
     *
     * @param limit          : If not equal to -1, then adds a limit operator to final query.
     * @param readAllDetails : Specifies whether all columns are requested from database.
     * @return List of E read from database;
     *
     * */
    @Override
    public List<FacilitySchema> handleReadQuery(int limit, boolean readAllDetails, List<FacilitySchema> facilties) throws SQLException {
        List<FacilitySchema> result = new ArrayList<>();

        if(facilties.size() != 0){
            for(FacilitySchema facility : facilties){
                result.addAll(getById(facility.facilityId));
            }
        }
        if(!readAllDetails){
            result = getAllWithBasicDetails(limit);
        } else{
            result = getAllWithAllDetails(limit);
        }
        closeConnection();

        return result;
    }

    /**
     * Handles the update query and sends it to the correct method in class
     *
     * @param request : list of facilites that need to be updated in the database
     * @return Updated list of facilites
     * */
    @Override
    public List<FacilitySchema> handleUpdateQuery(List<FacilitySchema> request) throws SQLException {
        closeConnection();
        return null;
    }

    /**
     * Handles the delete query and sends it to the correct method in class
     *
     * @param request : list of facilites that need to be deleted from the database
     * @return List of Airplanes removed
     * */
    @Override
    public List<FacilitySchema> handleDeleteQuery(List<FacilitySchema> request) throws SQLException {

        closeConnection();
        return null;
    }

    /**
     * Closes the connection to the datebase and must be run after each query
     *
     * */
    @Override
    public void closeConnection() throws SQLException {
        connection.close();
    }


}