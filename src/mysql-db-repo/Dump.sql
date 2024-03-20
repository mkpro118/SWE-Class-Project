
-- need to change
USE appdb;

CREATE TABLE Customer (
    CustomerId INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    `Description` VARCHAR(255),
    PRIMARY KEY (CustomerId)
);

CREATE TABLE Airplane (
    AirplaneId INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    ProductionStageName VARCHAR(100),
    Cost DECIMAL,
    DateStarted DATE,
    DateFinished DATE,
    CustomerId INTEGER,
    `Size` VARCHAR(100),
    HasFirstClass BOOLEAN,
    PRIMARY KEY(AirplaneId),
    FOREIGN KEY(CustomerId) REFERENCES Customer(CustomerId)
);

CREATE TABLE Supplier(
    SupplierId INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    `Description` VARCHAR(255),
    ComponentTypesList VARCHAR(255),        -- Comma Delimited List of Component Types this supplier makes
    PRIMARY KEY(SupplierId)
);

CREATE TABLE Component(
    ComponentId INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    `Description` VARCHAR(255),
    ComponentType VARCHAR(100),
    SupplierId INTEGER DEFAULT 0,           -- 0 = Made In House
    Cost DECIMAL,
    ProductionStageName VARCHAR(100),
    PRIMARY KEY(ComponentId),
    FOREIGN KEY(SupplierId) REFERENCES Supplier(SupplierId)
);

CREATE TABLE Facility(
    FacilityId INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    Latitude DECIMAL,
    Longtitude DECIMAL,
    `Description` VARCHAR(255),
    ComponentsInProduction INTEGER,
    ComponentsCompleted INTEGER,
    ModelsInProduction INTEGER,
    ModelsCompleted INTEGER,
    EmployeeCount INTEGER,
    ManagerId INTEGER,
    PRIMARY KEY(FacilityId)
);

CREATE TABLE Manager(
    ManagerId INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    `Password` VARCHAR(255),
    PositionTitle VARCHAR(100),
    AccessLevel INTEGER,
    FacilityId INTEGER,
    PRIMARY KEY(ManagerId),
    FOREIGN KEY(FacilityId) REFERENCES Facility(FacilityId)
);

CREATE TABLE SupplierFacility (
    Id INTEGER NOT NULL AUTO_INCREMENT,
    SupplierId INTEGER,
    FacilityId INTEGER,
    PRIMARY KEY(Id),
    FOREIGN KEY(SupplierId) REFERENCES Supplier(SupplierId),
    FOREIGN KEY(FacilityId) REFERENCES Facility(FacilityId)
);

CREATE TABLE AirplaneComponent (
    Id INTEGER NOT NULL AUTO_INCREMENT,
    AirplaneId INTEGER,
    ComponentId INTEGER,
    PRIMARY KEY(Id),
    FOREIGN KEY(AirplaneId) REFERENCES Airplane(AirplaneId),
    FOREIGN KEY(ComponentId) REFERENCES Component(ComponentId)
);

ALTER TABLE Facility
ADD FOREIGN KEY(ManagerId) REFERENCES Manager(ManagerId);

