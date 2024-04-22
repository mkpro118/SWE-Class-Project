package com.cs506.project.repos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import com.cs506.project.schemas.AirplaneSchema;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AirplaneRepositoryTest {

    @Mock
    private Connection mockConnection;

    @Mock
    private Statement mockStatement;

    @Mock
    private ResultSet mockResult;

    @Mock
    private AirplaneRepository mockAirplaneRepository;

    @BeforeEach
    public void setUp () throws SQLException {

        MockitoAnnotations.openMocks(this);

        AirplaneRepository repo = new AirplaneRepository(mockConnection);
        mockAirplaneRepository = spy(repo);

    }

    @Test
    public void testGetWithAllDetailsQueryString () throws SQLException {

        ArgumentCaptor<String> queryCaptor = ArgumentCaptor.forClass(String.class);

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(queryCaptor.capture())).thenReturn(mockResult);

        mockAirplaneRepository.getAllWithAllDetails(10);

        assertEquals("SELECT * FROM Airplane LIMIT 10", queryCaptor.getValue());

    }

    @Test
    public void testGetWithAllDetailsResponse () throws SQLException {

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        when(mockResult.next()).thenReturn(true).thenReturn(false);

        when(mockResult.getInt("AirplaneId")).thenReturn(1);
        when(mockResult.getString("Name")).thenReturn("Boeing 747");
        when(mockResult.getString("ProductionStageName")).thenReturn("Development");
        when(mockResult.getDouble("Cost")).thenReturn(14.1);
        when(mockResult.getDate("DateStarted")).thenReturn(new Date(2024, 11, 11));
        when(mockResult.getDate("DateFinished")).thenReturn(new Date(2024, 12, 12));
        when(mockResult.getInt("CustomerId")).thenReturn(1);
        when(mockResult.getString("Size")).thenReturn("Large");
        when(mockResult.getBoolean("HasFirstClass")).thenReturn(true);

        List<AirplaneSchema> response = mockAirplaneRepository.getAllWithAllDetails(1);

        assertEquals(1, response.size());

        AirplaneSchema airplane = response.get(0);

        assertEquals(1,airplane.airplaneId);
        assertEquals("Boeing 747",airplane.name);
        assertEquals("Development",airplane.productionStageName);
        assertEquals(14.1, airplane.cost);
        assertEquals(new Date(2024, 11, 11), airplane.dateStarted);
        assertEquals(new Date(2024, 12, 12), airplane.dateFinished);
        assertEquals( 1, airplane.customerId);
        assertEquals("Large",airplane.size);
        assertEquals(true, airplane.hasFirstClass);

    }

    @Test
    public void testGetByIdQueryString () throws SQLException {

        ArgumentCaptor<String> queryCaptor = ArgumentCaptor.forClass(String.class);

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(queryCaptor.capture())).thenReturn(mockResult);

        mockAirplaneRepository.getById(10);

        assertEquals("SELECT * FROM Airplane WHERE AirplaneId = 10", queryCaptor.getValue());

    }

    @Test
    public void testGetByIdResponse () throws SQLException {

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        when(mockResult.next()).thenReturn(true).thenReturn(false);

        when(mockResult.getInt("AirplaneId")).thenReturn(1);
        when(mockResult.getString("Name")).thenReturn("Boeing 747");
        when(mockResult.getString("ProductionStageName")).thenReturn("Development");
        when(mockResult.getDouble("Cost")).thenReturn(14.1);
        when(mockResult.getDate("DateStarted")).thenReturn(new Date(2024, 11, 11));
        when(mockResult.getDate("DateFinished")).thenReturn(new Date(2024, 12, 12));
        when(mockResult.getInt("CustomerId")).thenReturn(1);
        when(mockResult.getString("Size")).thenReturn("Large");
        when(mockResult.getBoolean("HasFirstClass")).thenReturn(true);

        List<AirplaneSchema> response = mockAirplaneRepository.getAllWithAllDetails(1);

        assertEquals(1, response.size());

        AirplaneSchema airplane = response.get(0);

        assertEquals(1,airplane.airplaneId);
        assertEquals("Boeing 747",airplane.name);
        assertEquals("Development",airplane.productionStageName);
        assertEquals(14.1, airplane.cost);
        assertEquals(new Date(2024, 11, 11), airplane.dateStarted);
        assertEquals(new Date(2024, 12, 12), airplane.dateFinished);
        assertEquals( 1, airplane.customerId);
        assertEquals("Large",airplane.size);
        assertEquals(true, airplane.hasFirstClass);

    }

    @Test
    public void testGetWithBasicDetailsQueryString () throws SQLException {
        ArgumentCaptor<String> queryCaptor = ArgumentCaptor.forClass(String.class);

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(queryCaptor.capture())).thenReturn(mockResult);

        mockAirplaneRepository.getAllWithBasicDetails(10);

        assertEquals("SELECT AirplaneId, Name, ProductionStageName, Cost FROM Airplane LIMIT 10", queryCaptor.getValue());
    }

    @Test
    public void testGetWithBasicDetailsResponse () throws SQLException {

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        when(mockResult.next()).thenReturn(true).thenReturn(false);

        when(mockResult.getInt("AirplaneId")).thenReturn(1);
        when(mockResult.getString("Name")).thenReturn("Boeing 747");
        when(mockResult.getString("ProductionStageName")).thenReturn("Development");
        when(mockResult.getDouble("Cost")).thenReturn(14.1);

        List<AirplaneSchema> response = mockAirplaneRepository.getAllWithBasicDetails(1);

        assertEquals(1, response.size());

        AirplaneSchema airplane = response.get(0);

        assertEquals(1,airplane.airplaneId);
        assertEquals("Boeing 747",airplane.name);
        assertEquals("Development",airplane.productionStageName);
        assertEquals(14.1, airplane.cost);
        assertEquals(null, airplane.size);

    }

    @Test
    public void testHandleReadQueryExecutesGetById () throws SQLException {
        List<AirplaneSchema> testList = new ArrayList<>();
        testList.add(new AirplaneSchema());

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        mockAirplaneRepository.handleReadQuery(10, false, testList);

        verify(mockAirplaneRepository).getById(anyInt());

    }

    @Test
    public void testHandleReadQueryExecutesGetAllWithBasicDetails () throws SQLException {
        List<AirplaneSchema> testList = new ArrayList<>();

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        mockAirplaneRepository.handleReadQuery(10, false, testList);

        verify(mockAirplaneRepository).getAllWithBasicDetails(anyInt());

    }

    @Test
    public void testHandleReadQueryExecutesGetAllDetails () throws SQLException {
        List<AirplaneSchema> testList = new ArrayList<>();

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        mockAirplaneRepository.handleReadQuery(10, true, testList);

        verify(mockAirplaneRepository).getAllWithAllDetails(anyInt());

    }

    @Test
    public void testHandleReadQueryCloseConnection () throws SQLException {
        List<AirplaneSchema> testList = new ArrayList<>();

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        mockAirplaneRepository.handleReadQuery(10, true, testList);

        verify(mockConnection).close();

    }

}
