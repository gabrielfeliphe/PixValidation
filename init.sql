CREATE DATABASE if not exists  dbapi;

USE dbapi;

CREATE TABLE if not exists BANCO (
id int NOT NULL AUTO_INCREMENT,
nome varchar(255) NOT NULL,
agencia INT NOT NULL,
CC INT NOT NULL,
createdAt datetime NOT NULL,
updatedAt datetime NOT NULL,
PRIMARY KEY (id)
) ;

CREATE TABLE if not exists CONTA (
id int NOT NULL AUTO_INCREMENT,
nome varchar(255) NOT NULL,
cpf_cnpj varchar(255) NOT NULL,
createdAt datetime NOT NULL,
updatedAt datetime NOT NULL,
PRIMARY KEY (id)
) ;

CREATE TABLE if not exists  PIXKEY (
id int NOT NULL AUTO_INCREMENT,
chavepix varchar(255) NOT NULL,
banco_id int NOT NULL,
conta_id int NOT NULL,
tipochave varchar(255) NOT NULL,
validado tinyint(1) NOT NULL,
email varchar(255) NOT NULL,
createdAt datetime NOT NULL,
updatedAt datetime NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (banco_id) REFERENCES BANCO(id),
FOREIGN KEY (conta_id) REFERENCES CONTA(id)
);

INSERT INTO BANCO (id,nome, agencia, CC, createdAt, updatedAt)
SELECT 1, 'Banco do Brasil', '1', '1', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM BANCO WHERE id = 1);

INSERT INTO CONTA (id,nome, cpf_cnpj, createdAt, updatedAt)
SELECT 1, 'Geraldo', '873.078.680-08', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM CONTA WHERE id = 1);

INSERT INTO PIXKEY (id,chavepix, banco_id, conta_id, tipochave, validado, email, createdAt, updatedAt)
SELECT 1,'873.078.680-08', 1, 1, 'CPF', true, 'EMAILLEGAL@BEMLEGALZAO.COM', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM PIXKEY WHERE id = 1);