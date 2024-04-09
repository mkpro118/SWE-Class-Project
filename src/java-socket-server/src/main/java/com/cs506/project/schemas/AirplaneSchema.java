package com.cs506.project.schemas;

import java.util.Date;

/**
 * This class represents an Airplane row in the Airplane table in our 506 database.
 */
public class AirplaneSchema {

    /**
     * This is the unique id of the airplane queried.
     */
    public int airplaneId;

    /**
     * This is the name of the airplane queried.
     */
    public String name;

    /**
     * This is the stage of production the airplane queried is currently in.
     */
    public String productionStageName;

    /**
     * This is the total cost of producing the airplane queried.
     */
    public double cost;

    /**
     * This is the date production of the airplane queried started.
     */
    public Date dateStarted;

    /**
     * This is the date production of the airplane queried ceased.
     */
    public Date dateFinished;

    /**
     * This is the id of the customer that purchased the airplane queried.
     */
    public int customerId;

    /**
     * This is the size category of the airplane queried.
     */
    public String size;

    /**
     * This indicates whether the airplane queried contains first class seating.
     */
    public boolean hasFirstClass;

}
