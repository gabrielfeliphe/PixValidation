CREATE DATABASE IF NOT EXISTS dbapi;

USE dbapi;

CREATE TABLE IF NOT EXISTS Bank (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
agency VARCHAR(255) NOT NULL,
accountNumber VARCHAR(255) NOT NULL,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Account (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
federalDocument VARCHAR(255) NOT NULL,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS PIXKEY (
id INT NOT NULL AUTO_INCREMENT,
pixKey VARCHAR(255) NOT NULL,
bank_id INT NOT NULL,
account_id INT NOT NULL,
typeOfKey VARCHAR(255) NOT NULL,
valid BOOLEAN NOT NULL,
email VARCHAR(255) NOT NULL,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (bank_id) REFERENCES Bank(id),
FOREIGN KEY (account_id) REFERENCES Account(id)
);

CREATE DATABASE IF NOT EXISTS dbtest;

USE dbtest;

CREATE TABLE IF NOT EXISTS Bank (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
agency VARCHAR(255) NOT NULL,
accountNumber VARCHAR(255) NOT NULL,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Account (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
federalDocument VARCHAR(255) NOT NULL,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS PIXKEY (
id INT NOT NULL AUTO_INCREMENT,
pixKey VARCHAR(255) NOT NULL,
bank_id INT NOT NULL,
account_id INT NOT NULL,
typeOfKey VARCHAR(255) NOT NULL,
valid BOOLEAN NOT NULL,
email VARCHAR(255) NOT NULL,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (bank_id) REFERENCES Bank(id),
FOREIGN KEY (account_id) REFERENCES Account(id)
);
