
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
    City VARCHAR(100),
    State VARCHAR(100),
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

-- AIRPLANE
INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Boeing 747', 'Assembly', 250000000.00, '2023-01-01', '2024-01-01', 1, 'Large', true);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Airbus A380', 'Testing', 275000000.00, '2023-02-01', '2024-02-01', 2, 'Extra-Large', true);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Cessna 172', 'Assembly', 80000.00, '2023-03-01', '2023-06-01', 3, 'Small', false);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Bombardier Global 7500', 'Painting', 73000000.00, '2023-04-01', '2023-09-01', 4, 'Medium', true);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Embraer Phenom 300', 'Testing', 9200000.00, '2023-05-01', '2023-10-01', 5, 'Medium', false);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Gulfstream G650', 'Assembly', 70000000.00, '2023-06-01', '2024-01-01', 6, 'Large', true);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Dassault Falcon 7X', 'Testing', 55000000.00, '2023-07-01', '2023-12-01', 7, 'Large', true);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Boeing 787', 'Assembly', 200000000.00, '2023-08-01', '2024-04-01', 8, 'Large', true);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Airbus A320', 'Testing', 110000000.00, '2023-09-01', '2024-05-01', 9, 'Medium', true);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Cirrus SR22', 'Assembly', 650000.00, '2023-10-01', '2023-11-01', 10, 'Small', false);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Pilatus PC-12', 'Painting', 4500000.00, '2023-11-01', '2024-02-01', 11, 'Medium', false);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Cessna Citation Longitude', 'Testing', 27000000.00, '2023-12-01', '2024-03-01', 12, 'Large', true);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Embraer Legacy 500', 'Assembly', 21000000.00, '2024-01-01', '2024-06-01', 13, 'Medium', true);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Bombardier Challenger 350', 'Testing', 25000000.00, '2024-02-01', '2024-07-01', 14, 'Medium', true);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Gulfstream G550', 'Assembly', 60000000.00, '2024-03-01', '2024-08-01', 15, 'Large', true);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Dassault Falcon 2000S', 'Testing', 30000000.00, '2024-04-01', '2024-09-01', 16, 'Large', true);

INSERT INTO Airplane (`Name`, ProductionStageName, Cost, DateStarted, DateFinished, CustomerId, `Size`, HasFirstClass)
VALUES ('Boeing 737', 'Assembly', 120000000.00, '2024-05-01', '2024-10-01', 17, 'Medium', true);
-- AIRPLANE


-- COMPONENT
INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Engine', 'Jet engine for propulsion', 'Propulsion', 0, 1000000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Wing', 'Aircraft wing for lift', 'Structure', 0, 500000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Landing Gear', 'Aircraft landing system', 'System', 0, 200000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Avionics', 'Electronic systems for navigation and communication', 'Electronics', 0, 300000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Cockpit', 'Aircraft control and monitoring', 'System', 0, 400000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Fuel System', 'Aircraft fuel storage and delivery', 'System', 0, 150000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Interior', 'Aircraft cabin and seating', 'Interior', 0, 200000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Tail Assembly', 'Aircraft tail section', 'Structure', 0, 250000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Navigation Lights', 'Aircraft navigation lighting', 'Lighting', 0, 10000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Hydraulic System', 'Aircraft hydraulic systems', 'System', 0, 100000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Oxygen System', 'Aircraft oxygen supply', 'System', 0, 50000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Aircraft Tires', 'Aircraft tire set', 'Tires', 0, 20000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Control Surfaces', 'Aircraft control surfaces', 'Structure', 0, 150000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Communication Systems', 'Aircraft communication equipment', 'Electronics', 0, 250000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Seating', 'Aircraft seating', 'Interior', 0, 100000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Windows', 'Aircraft windows', 'Windows', 0, 50000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Emergency Systems', 'Aircraft emergency systems', 'Safety', 0, 200000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Engine Controls', 'Aircraft engine control systems', 'System', 0, 100000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Cargo Bay', 'Aircraft cargo storage', 'Cargo', 0, 300000.00, 'Assembly');

INSERT INTO Component (`Name`, `Description`, ComponentType, SupplierId, Cost, ProductionStageName)
VALUES ('Lavatory', 'Aircraft lavatory facilities', 'Interior', 0, 50000.00, 'Assembly');
-- COMPONENT

-- FACILITY
INSERT INTO Facility (`Name`, City, State, `Description`, ComponentsInProduction, ComponentsCompleted, ModelsInProduction, ModelsCompleted, EmployeeCount, ManagerId)
VALUES ('Seattle Plant', 'Seattle', 'Washington', 'Main production facility in Seattle', 15, 25, 3, 5, 200, 1);

INSERT INTO Facility (`Name`, City, State, `Description`, ComponentsInProduction, ComponentsCompleted, ModelsInProduction, ModelsCompleted, EmployeeCount, ManagerId)
VALUES ('Dallas Facility', 'Dallas', 'Texas', 'Secondary facility in Dallas', 10, 20, 2, 4, 150, 2);

INSERT INTO Facility (`Name`, City, State, `Description`, ComponentsInProduction, ComponentsCompleted, ModelsInProduction, ModelsCompleted, EmployeeCount, ManagerId)
VALUES ('Miami Plant', 'Miami', 'Florida', 'Production facility in Miami', 8, 15, 1, 3, 100, 3);

INSERT INTO Facility (`Name`, City, State, `Description`, ComponentsInProduction, ComponentsCompleted, ModelsInProduction, ModelsCompleted, EmployeeCount, ManagerId)
VALUES ('Chicago Facility', 'Chicago', 'Illinois', 'Secondary facility in Chicago', 12, 18, 2, 4, 120, 4);

INSERT INTO Facility (`Name`, City, State, `Description`, ComponentsInProduction, ComponentsCompleted, ModelsInProduction, ModelsCompleted, EmployeeCount, ManagerId)
VALUES ('Los Angeles Plant', 'Los Angeles', 'California', 'Main production facility in Los Angeles', 18, 30, 4, 6, 250, 5);

INSERT INTO Facility (`Name`, City, State, `Description`, ComponentsInProduction, ComponentsCompleted, ModelsInProduction, ModelsCompleted, EmployeeCount, ManagerId)
VALUES ('Houston Facility', 'Houston', 'Texas', 'Secondary facility in Houston', 10, 20, 3, 5, 180, 6);

INSERT INTO Facility (`Name`, City, State, `Description`, ComponentsInProduction, ComponentsCompleted, ModelsInProduction, ModelsCompleted, EmployeeCount, ManagerId)
VALUES ('New York Plant', 'New York', 'New York', 'Main production facility in New York', 20, 35, 5, 7, 300, 7);

INSERT INTO Facility (`Name`, City, State, `Description`, ComponentsInProduction, ComponentsCompleted, ModelsInProduction, ModelsCompleted, EmployeeCount, ManagerId)
VALUES ('Atlanta Facility', 'Atlanta', 'Georgia', 'Secondary facility in Atlanta', 12, 22, 2, 4, 160, 8);

INSERT INTO Facility (`Name`, City, State, `Description`, ComponentsInProduction, ComponentsCompleted, ModelsInProduction, ModelsCompleted, EmployeeCount, ManagerId)
VALUES ('San Francisco Plant', 'San Francisco', 'California', 'Main production facility in San Francisco', 16, 28, 4, 6, 220, 9);

INSERT INTO Facility (`Name`, City, State, `Description`, ComponentsInProduction, ComponentsCompleted, ModelsInProduction, ModelsCompleted, EmployeeCount, ManagerId)
VALUES ('Detroit Facility', 'Detroit', 'Michigan', 'Secondary facility in Detroit', 10, 18, 2, 3, 140, 10);
-- FACILITY
