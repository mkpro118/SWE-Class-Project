package com.cs506.project.repos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import com.cs506.project.schemas.AirplaneSchema;
import com.cs506.project.schemas.ComponentSchema;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ComponentRepositoryTest {

    @Mock
    private Connection mockConnection;

    @Mock
    private Statement mockStatement;

    @Mock
    private ResultSet mockResult;

    @Mock
    private ComponentRepository mockComponentRepository;

    @BeforeEach
    public void setUp () {

        MockitoAnnotations.openMocks(this);

        ComponentRepository repo = new ComponentRepository(mockConnection);
        mockComponentRepository = spy(repo);

    }

    @Test
    public void testGetWithAllDetailsQueryString () throws SQLException {

        ArgumentCaptor<String> queryCaptor = ArgumentCaptor.forClass(String.class);

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(queryCaptor.capture())).thenReturn(mockResult);

        mockComponentRepository.getAllWithAllDetails(10);

        assertEquals("SELECT * FROM Component LIMIT 10", queryCaptor.getValue());

    }

    @Test
    public void testGetWithAllDetailsResponse () throws SQLException {

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        when(mockResult.next()).thenReturn(true).thenReturn(false);

        when(mockResult.getInt("ComponentId")).thenReturn(1);
        when(mockResult.getString("Name")).thenReturn("Wing");
        when(mockResult.getString("ProductionStageName")).thenReturn("Development");
        when(mockResult.getDouble("Cost")).thenReturn(14.1);
        when(mockResult.getString("Description")).thenReturn("Hello World");
        when(mockResult.getString("ComponentType")).thenReturn("Wing");
        when(mockResult.getInt("SupplierId")).thenReturn(1);

        List<ComponentSchema> response = mockComponentRepository.getAllWithAllDetails(1);

        assertEquals(1, response.size());

        ComponentSchema component = response.get(0);

        assertEquals(1,component.componentId);
        assertEquals("Wing",component.name);
        assertEquals("Development",component.productionStageName);
        assertEquals(14.1, component.cost);
        assertEquals("Hello World", component.description);
        assertEquals("Wing", component.componentType);
        assertEquals( 1, component.supplierId);

    }

    @Test
    public void testGetWithBasicDetailsQueryString () throws SQLException {

        ArgumentCaptor<String> queryCaptor = ArgumentCaptor.forClass(String.class);

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(queryCaptor.capture())).thenReturn(mockResult);

        mockComponentRepository.getAllWithBasicDetails(10);

        assertEquals("SELECT ComponentId, Name, ProductionStageName, Cost FROM Component LIMIT 10", queryCaptor.getValue());

    }

    @Test
    public void testGetWithBasicDetailsResponse () throws SQLException {

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        when(mockResult.next()).thenReturn(true).thenReturn(false);

        when(mockResult.getInt("ComponentId")).thenReturn(1);
        when(mockResult.getString("Name")).thenReturn("Wing");
        when(mockResult.getString("ProductionStageName")).thenReturn("Development");
        when(mockResult.getDouble("Cost")).thenReturn(14.1);

        List<ComponentSchema> response = mockComponentRepository.getAllWithBasicDetails(1);

        assertEquals(1, response.size());

        ComponentSchema component = response.get(0);

        assertEquals(1,component.componentId);
        assertEquals("Wing",component.name);
        assertEquals("Development",component.productionStageName);
        assertEquals(14.1, component.cost);
        assertEquals(null, component.description);

    }

    @Test
    public void testGetByIdQueryString () throws SQLException {

        ArgumentCaptor<String> queryCaptor = ArgumentCaptor.forClass(String.class);

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(queryCaptor.capture())).thenReturn(mockResult);

        mockComponentRepository.getById(10);

        assertEquals("SELECT * FROM Component WHERE ComponentId = 10", queryCaptor.getValue());

    }

    @Test
    public void testgetByIdResponse () throws SQLException {

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        when(mockResult.next()).thenReturn(true).thenReturn(false);

        when(mockResult.getInt("ComponentId")).thenReturn(1);
        when(mockResult.getString("Name")).thenReturn("Wing");
        when(mockResult.getString("ProductionStageName")).thenReturn("Development");
        when(mockResult.getDouble("Cost")).thenReturn(14.1);
        when(mockResult.getString("Description")).thenReturn("Hello World");
        when(mockResult.getString("ComponentType")).thenReturn("Wing");
        when(mockResult.getInt("SupplierId")).thenReturn(1);

        List<ComponentSchema> response = mockComponentRepository.getAllWithAllDetails(1);

        assertEquals(1, response.size());

        ComponentSchema component = response.get(0);

        assertEquals(1,component.componentId);
        assertEquals("Wing",component.name);
        assertEquals("Development",component.productionStageName);
        assertEquals(14.1, component.cost);
        assertEquals("Hello World", component.description);
        assertEquals("Wing", component.componentType);
        assertEquals( 1, component.supplierId);

    }

    @Test
    public void testHandReadQueryExecutesGetById () throws SQLException {
        List<ComponentSchema> testList = new ArrayList<>();
        testList.add(new ComponentSchema());

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        mockComponentRepository.handleReadQuery(10, false, testList);

        verify(mockComponentRepository).getById(anyInt());

    }

    @Test
    public void testHandleReadQueryExecutesGetAllWithBasicDetails () throws SQLException {
        List<ComponentSchema> testList = new ArrayList<>();

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        mockComponentRepository.handleReadQuery(10, false, testList);

        verify(mockComponentRepository).getAllWithBasicDetails(anyInt());

    }

    @Test
    public void testHandleReadQueryExecutesGetAllDetails () throws SQLException {
        List<ComponentSchema> testList = new ArrayList<>();

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        mockComponentRepository.handleReadQuery(10, true, testList);

        verify(mockComponentRepository).getAllWithAllDetails(anyInt());

    }

    @Test
    public void testHandleReadQueryCloseConnection () throws SQLException {
        List<ComponentSchema> testList = new ArrayList<>();

        when(mockConnection.createStatement()).thenReturn(mockStatement);
        when(mockStatement.executeQuery(anyString())).thenReturn(mockResult);

        mockComponentRepository.handleReadQuery(10, true, testList);

        verify(mockConnection).close();

    }

}