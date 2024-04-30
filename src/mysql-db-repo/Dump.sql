-- need to change
USE appdb;

CREATE TABLE Customer (
    CustomerId INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    `Description` VARCHAR(255),
    PRIMARY KEY (CustomerId)
);

CREATE TABLE Airplane (
    AirplaneId INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    Description VARCHAR(255),
    City VARCHAR(100),
    State VARCHAR(100),
    ProductionStage VARCHAR(100),
    Cost DECIMAL,
    DateStarted DATE,
    DateFinished DATE,
    FacilityId INT,
    SeatingCapacity INT,
    `Size` VARCHAR(100),
    HasFirstClass BOOLEAN,
    PRIMARY KEY(AirplaneId)
);

CREATE TABLE Supplier(
    SupplierId INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    `Description` VARCHAR(255),
    ComponentTypesList VARCHAR(255),        -- Comma Delimited List of Component Types this supplier makes
    PRIMARY KEY(SupplierId)
);

CREATE TABLE Component(
    ComponentId INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    `Description` VARCHAR(255),
    City VARCHAR(100),
    State VARCHAR(100),
    ComponentType VARCHAR(100),
    SupplierId INT DEFAULT 0,           -- 0 = Made In House
    Cost DECIMAL,
    ProductionStage VARCHAR(100),
    PRIMARY KEY(ComponentId)
);

CREATE TABLE Facility(
    FacilityId INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    City VARCHAR(100),
    State VARCHAR(100),
    `Description` VARCHAR(255),
    ComponentsInProduction INT,
    ComponentsCompleted INT,
    ModelsInProduction INT,
    ModelsCompleted INT,
    EmployeeCount INT,
    ManagerId INT,
    PRIMARY KEY(FacilityId)
);

CREATE TABLE Manager(
    ManagerId INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    `Password` VARCHAR(255),
    PositionTitle VARCHAR(100),
    AccessLevel INT,
    FacilityId INT,
    PRIMARY KEY(ManagerId)
);

CREATE TABLE SupplierFacility (
    Id INT NOT NULL AUTO_INCREMENT,
    SupplierId INT,
    FacilityId INT,
    PRIMARY KEY(Id)
);

CREATE TABLE AirplaneComponent (
    Id INT NOT NULL AUTO_INCREMENT,
    AirplaneId INT,
    ComponentId INT,
    PRIMARY KEY(Id)
);

-- AIRPLANE
INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Boeing 747', 'A large, long-range wide-body airliner with a capacity of 350 passengers, known for its iconic hump upper deck design.', 'North Jennifer', 'New Hampshire', 'Unstarted', 250000000.00, '2023-01-01', '2024-01-01', 1, 350, 'Large', true);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Airbus A380', 'An extra-large, double-deck, wide-body airliner with a capacity of 500 passengers, designed for long-haul flights.', 'Lake Dominic', 'Missouri', 'Finished', 275000000.00, '2023-02-01', '2024-02-01', 2, 500, 'Extra-Large', true);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Cessna 172', 'A small, single-engine aircraft primarily used for flight training and personal travel.', 'East Denise', 'Oregon', 'Unstarted', 80000.00, '2023-03-01', '2023-06-01', 3, 75, 'Small', false);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Bombardier Global 7500', 'A medium-sized, long-range business jet with a seating capacity of 225 passengers, known for its luxurious cabin.', 'South Kristen', 'Pennsylvania', 'In-Progress', 73000000.00, '2023-04-01', '2023-09-01', 4, 225, 'Medium', true);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Embraer Phenom 300', 'A medium-sized business jet with a seating capacity of 225 passengers, known for its performance and efficiency.', 'Juliemouth', 'Virginia', 'Finished', 9200000.00, '2023-05-01', '2023-10-01', 5, 225, 'Medium', false);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Gulfstream G650', 'A large, long-range business jet with a seating capacity of 350 passengers, known for its speed and range.', 'Rodriguezmouth', 'Ohio', 'Unstarted', 70000000.00, '2023-06-01', '2024-01-01', 6, 350, 'Large', true);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Dassault Falcon 7X', 'A large, long-range business jet with a seating capacity of 350 passengers, known for its advanced technology and comfort.', 'Keithport', 'Idaho', 'Finished', 55000000.00, '2023-07-01', '2023-12-01', 7, 350, 'Large', true);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Boeing 787', 'A large, long-range wide-body airliner with a seating capacity of 350 passengers, known for its fuel efficiency and advanced features.', 'New Chelsea', 'New York', 'Unstarted', 200000000.00, '2023-08-01', '2024-04-01', 8, 350, 'Large', true);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Airbus A320', 'A medium-sized, single-aisle airliner with a seating capacity of 225 passengers, known for its reliability and efficiency.', 'Gainesborough', 'Arizona', 'Finished', 110000000.00, '2023-09-01', '2024-05-01', 9, 225, 'Medium', true);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Cirrus SR22', 'A small, single-engine aircraft primarily used for personal travel and flight training, with a seating capacity of 75.', 'New Hollyville', 'Illinois', 'Unstarted', 650000.00, '2023-10-01', '2023-11-01', 10, 75, 'Small', false);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Pilatus PC-12', 'A medium-sized, single-engine aircraft used for executive transport and regional travel, with a seating capacity of 225 passengers.', 'Port Kristin', 'Georgia', 'In-Progress', 4500000.00, '2023-11-01', '2024-02-01', 11, 225, 'Medium', false);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Cessna Citation Longitude', 'A large, long-range business jet with a seating capacity of 350 passengers, known for its comfort and performance.', 'Alexachester', 'New Jersey', 'Finished', 27000000.00, '2023-12-01', '2024-03-01', 12, 350, 'Large', true);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Embraer Legacy 500', 'A medium-sized business jet with a seating capacity of 225 passengers, known for its range and spacious cabin.', 'Christensenberg', 'New Hampshire', 'Unstarted', 21000000.00, '2024-01-01', '2024-06-01', 13, 225, 'Medium', true);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Bombardier Challenger 350', 'A medium-sized business jet with a seating capacity of 225 passengers, known for its performance and comfort.', 'South Aliciachester', 'Missouri', 'Finished', 25000000.00, '2024-02-01', '2024-07-01', 14, 225, 'Medium', true);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Gulfstream G550', 'A large, long-range business jet with a seating capacity of 350 passengers, known for its range and cabin comfort.', 'Port Philiphaven', 'North Carolina', 'Unstarted', 60000000.00, '2024-03-01', '2024-08-01', 15, 350, 'Large', true);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Dassault Falcon 2000S', 'A large, long-range business jet with a seating capacity of 350 passengers, known for its efficiency and performance.', 'Arielfort', 'Mississippi', 'Finished', 30000000.00, '2024-04-01', '2024-09-01', 16, 350, 'Large', true);

INSERT INTO Airplane (`Name`, Description, City, State, ProductionStage, Cost, DateStarted, DateFinished, FacilityId, SeatingCapacity, `Size`, HasFirstClass)
VALUES ('Boeing 737', 'A medium-sized, single-aisle airliner with a seating capacity of 225 passengers, known for its reliability and versatility.', 'Riosfurt', 'Nevada', 'Unstarted', 120000000.00, '2024-05-01', '2024-10-01', 17, 225, 'Medium', true);
-- AIRPLANE


-- COMPONENT
INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Engine', 'Jet engine for propulsion', 'Williamsshire', 'Maine', 'Propulsion', 0, 1000000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Wing', 'Aircraft wing for lift', 'Danielberg', 'Georgia', 'Structure', 0, 500000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Landing Gear', 'Aircraft landing system', 'Timothychester', 'Delaware', 'System', 0, 200000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Avionics', 'Electronic systems for navigation and communication', 'South Lynnshire', 'Idaho', 'Electronics', 0, 300000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Cockpit', 'Aircraft control and monitoring', 'Laurenton', 'Louisiana', 'System', 0, 400000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Fuel System', 'Aircraft fuel storage and delivery', 'Castillobury', 'Massachusetts', 'System', 0, 150000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Interior', 'Aircraft cabin and seating', 'Lawrencebury', 'California', 'Interior', 0, 200000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Tail Unstarted', 'Aircraft tail section', 'Davidmouth', 'Missouri', 'Structure', 0, 250000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Navigation Lights', 'Aircraft navigation lighting', 'West Jenniferside', 'Mississippi', 'Lighting', 0, 10000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Hydraulic System', 'Aircraft hydraulic systems', 'Pottermouth', 'Maine', 'System', 0, 100000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Oxygen System', 'Aircraft oxygen supply', 'Lake Gerald', 'Pennsylvania', 'System', 0, 50000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Aircraft Tires', 'Aircraft tire set', 'Destinyfort', 'Arizona', 'Tires', 0, 20000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Control Surfaces', 'Aircraft control surfaces', 'North Barbara', 'Arizona', 'Structure', 0, 150000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Communication Systems', 'Aircraft communication equipment', 'Nelsonchester', 'South Carolina', 'Electronics', 0, 250000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Seating', 'Aircraft seating', 'Powellbury', 'Ohio', 'Interior', 0, 100000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Windows', 'Aircraft windows', 'South Justin', 'Arizona', 'Windows', 0, 50000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Emergency Systems', 'Aircraft emergency systems', 'Jacquelineborough', 'Washington', 'Safety', 0, 200000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Engine Controls', 'Aircraft engine control systems', 'West Christophershire', 'Tennessee', 'System', 0, 100000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Cargo Bay', 'Aircraft cargo storage', 'Mossbury', 'New Mexico', 'Cargo', 0, 300000.00, 'Unstarted');

INSERT INTO Component (`Name`, `Description`, City, State, ComponentType, SupplierId, Cost, ProductionStage)
VALUES ('Lavatory', 'Aircraft lavatory facilities', 'West Robertfurt', 'Wisconsin', 'Interior', 0, 50000.00, 'Unstarted');
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
