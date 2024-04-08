package com.cs506.project;
import java.sql.*;

public class JDBCConnection {
    //these variables will need to change to fit what our project actually does
    //for now these are the placeholders.
    private static final String DB_URL = "jdbc:mysql://localhost:3306/mydb";
    private static final String USER = "username";
    private static final String PASS = "password";
    private static Connection connection;
    public static Connection getConnection(){
        if (connection == null){
            try{
                //registers the JDBC driver
                Class.forName("com.mysql.cj.jdbc.Driver");
                // opens the connection
                connection = DriverManager.getConnection(DB_URL,USER,PASS);
            } catch(Exception e ){
                e.printStackTrace();
            }
        }
        return connection;
    }

    public static void closeConnection(){
        if(connection != null){
            try{
                connection.close();
            } catch(Exception e){
                e.printStackTrace();
            }
        }
    }
}
