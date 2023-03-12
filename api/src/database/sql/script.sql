CREATE DATABASE IF NOT EXISTS students_management;

USE students_management;

DROP TABLE IF EXISTS  users;

CREATE TABLE users (
    id integer NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    ra VARCHAR(10),
    image_public_id VARCHAR(50),
    PRIMARY KEY (id)
);
