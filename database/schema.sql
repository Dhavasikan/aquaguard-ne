CREATE DATABASE IF NOT EXISTS health_monitor_db;
USE health_monitor_db;

CREATE TABLE users (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(100) NOT NULL,
    user_code     VARCHAR(50)  UNIQUE NOT NULL,
    email         VARCHAR(100) UNIQUE NOT NULL,
    password      VARCHAR(255) NOT NULL,
    role          VARCHAR(30)  NOT NULL,
    district      VARCHAR(100),
    phone         VARCHAR(15),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE case_reports (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    patient_name      VARCHAR(100) NOT NULL,
    age               INT,
    gender            VARCHAR(10),
    village           VARCHAR(100),
    district          VARCHAR(100),
    symptoms          VARCHAR(255),
    disease_suspected VARCHAR(100),
    report_date       DATE,
    reported_by       INT,
    status            VARCHAR(20) DEFAULT 'PENDING',
    FOREIGN KEY (reported_by) REFERENCES users(id)
);

CREATE TABLE water_quality (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    source_name  VARCHAR(100),
    village      VARCHAR(100),
    ph_value     DECIMAL(4,2),
    turbidity    DECIMAL(6,2),
    tds_value    DECIMAL(6,2),
    tested_date  DATE,
    risk_level   VARCHAR(20)
);

CREATE TABLE alerts (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    district      VARCHAR(100),
    alert_message VARCHAR(255),
    severity      VARCHAR(20),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (full_name, user_code, email, password, role, district, phone)
VALUES 
('Test Admin',    'ADM-001',  'admin@test.com', 'admin123', 'ADMIN', 'Cachar',  '9000000001'),
('ASHA Worker',   'ASHA-001', 'asha@test.com',  'asha123',  'ASHA',  'Ri Bhoi', '9000000002'),
('Health Officer','DHO-001',  'dho@test.com',   'dho123',   'DHO',   'Kamrup',  '9000000003');