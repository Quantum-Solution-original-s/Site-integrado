CREATE DATABASE QuantumSensors;

USE QuantumSensors;

-- CRIAÇÃO TABELAS

CREATE TABLE Endereco
(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
estado VARCHAR(20) NOT NULL,
UF CHAR(2) NOT NULL,
cidade VARCHAR(50) NOT NULL,
logradouro VARCHAR(50) NOT NULL,
numero VARCHAR(4),
bairro VARCHAR(45) NOT NULL,
cep CHAR(8)
);


CREATE TABLE empresa
(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(14) UNIQUE NOT NULL,
nomeEmpresa VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
senha VARCHAR(20) NOT NULL,
ddd CHAR(2) NOT NULL, 
telefoneFixo CHAR(8) NOT NULL,
tipoPlano VARCHAR(20) NOT NULL,
CONSTRAINT chkPlano check(tipoPlano IN('QuantumStandard', 'QuantumPremium')), 
dtAdesaoPlano DATE,
fkEndereco INT,
CONSTRAINT fkEnd FOREIGN KEY (fkEndereco)
	REFERENCES endereco (idEndereco)
);


CREATE TABLE Estufa
(
idEstufa INT PRIMARY KEY AUTO_INCREMENT,
area DECIMAL(8,2) NOT NULL,
capacidadeProducao INT NOT NULL,
tipoEstufa VARCHAR(45),
certificacao VARCHAR(45),
dtPlantio DATE,
dtColheita DATE,
fkEndereco INT,
CONSTRAINT fkEndereco FOREIGN KEY (fkEndereco)
	REFERENCES endereco (idEndereco),
fkEmpresa INT, 
CONSTRAINT fkEmp FOREIGN KEY (fkEmpresa)
	REFERENCES empresa (idEmpresa)
);

CREATE TABLE sensor
(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
codigo VARCHAR(10) NOT NULL,
dtInstalacao DATE NOT NULL,
statusSensor VARCHAR(20) NOT NULL,
CONSTRAINT chkStatusSensor check (statusSensor IN ('ativo', 'inativo', 'defeito', 'manutencao')),
localizacaoSensorEstufa VARCHAR(45),
CONSTRAINT chkLocSensor check(localizacaoSensorEstufa IN('Quadrante 1', 'Quadrante 2', 'Quadrante 3', 'Quadrante 4')),
fkEstufa INT,
CONSTRAINT fkEst FOREIGN KEY (fkEstufa)
	REFERENCES estufa (idEstufa)
);

CREATE TABLE registro 
(
idRegistro INT AUTO_INCREMENT,
dt_horaAtual DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
temperatura FLOAT NOT NULL,
umidade FLOAT NOT NULL,
fkSensor INT,
CONSTRAINT fkSensor FOREIGN KEY (fkSensor)
	REFERENCES sensor (idSensor),
PRIMARY KEY (idRegistro, fkSensor)
);



-- INSERÇÃO DE REGISTROS NAS TABELAS

-- ENDERECO
INSERT INTO endereco (estado, UF, cidade, logradouro, numero, bairro, cep) VALUES
('Bahia', 'BA', 'Governador Mangabeira', 'Rua Povoado Bonsucesso', 69, 'Zona Rural',  44350-000),
('Bahia', 'BA', 'Cidade Cruz das Almas', 'Rodovia Br 101, KM 194', NULL, 'Zona Rural',  44.380-000),
('Rio Grande do Sul', 'RS','Santa Cruz do Sul', 'Estrada do Couto, KM 3', NULL, 'Arroio do Couto', NULL),
('Santa Catarina', 'SC','Itaiópolis', 'Av. Alexandre Ricardo Worel', 3175, 'Lucena', 89340-000),
('Santa Catarina', 'SC', 'Florianópolis',  'Rua São José', 300, 'Balneário Estreito', 88075-310),
('Rio Grande do Sul', 'RS', 'Rio Grande', 'Rua Vinte e Quatro de Maio', 24, 'Centro', 96200-003),
('Bahia', 'BA', 'Jequié','Avenida Cosme de Farias', 29, 'Rio Claro', 87356-098),
('Santa Catarina', 'SC','Itajaí','Rua Alberto Werner', 100, 'Vila Operária', 87356-078);


    
-- EMPRESA
INSERT INTO empresa (cnpj, nomeEmpresa, email, senha, ddd, telefoneFixo, tipoPlano, dtAdesaoPlano, fkEndereco ) VALUES
(23398926000182, 'Emporio Tabaco', 'cadastro@emporiodotabaco.com.br', '012b3222', 19, 35431550, 'QuantumStandard', '2023-10-23', 5 ),
(26318116000167, 'Tabacaria Trevo', 'contabilidade@tabacariatrevo.com', 'tre9888', 21, 36716826, 'QuantumPremium', '2023-10-26', 6),
(47543145000100, 'Cigarrete Company', 'institucional@cigarretecompany.com', '0333ci', 42, 35938100, 'QuantumPremium', '2023-10-27', 7),
(21942051000102, 'SutliffTobacco Company', "sutliffbacco@company.com", 'su7667', 62, 30974825, 'QuantumStandard', '2023-09-24', 8);


-- ESTUFA
INSERT INTO estufa (area, capacidadeProducao, tipoEstufa, certificacao, dtPlantio, dtColheita, fkEndereco, fkEmpresa) VALUES
	(1100, 7700, 'capela', 'Produção Integrada', '2023-07-31', '2023-12-28', 1, 1 ),
    (2500, 17000, 'arco', 'Orgânica', '2023-07-28', '2023-01-29', 2, 2),
	(2800, 19000, 'capela germinada', NULL, '2023-08-02', '2023-01-20', 3, 3),
    (1500, 10500, 'londrina', NULL,  '2023-08-01', '2023-12-24', 4, 4);
    
-- SENSORES
INSERT INTO sensor (nome, codigo, dtInstalacao, statusSensor,  localizacaoSensorEstufa, fkEstufa) VALUES
('Sensor Estufa 1', 'ABC123', '2023-10-05', 'ativo', 'Quadrante 1', 1),
('Sensor Estufa 2', 'DCE123', '2023-10-09', 'ativo', 'Quadrante 2', 1),
('Sensor Estufa 3', 'EFG123', '2023-10-21', 'inativo', 'Quadrante 3', 1),
('Sensor Estufa 4', 'HIJ123', '2023-10-18', 'inativo', 'Quadrante 4', 1),
('DHT11-001', 'XYZ789', '2023-10-06', 'ativo', 'Quadrante 1', 2),
('DHT11-002', 'HIJ789', '2023-09-02', 'manutencao', 'Quadrante 4', 2),
('Sensor de Temperatura e Umidade Principal', 'LMN456', '2023-10-07', 'ativo', 'Quadrante 2', 3),
('Sensor de Temperatura e Umidade Secundario', 'LMN465', '2023-10-07', 'ativo', 'Quadrante 3', 3),
('Sensor A', 'PQR321', '2023-10-08', 'manutencao', 'Quadrante 3', 4),
('Sensor B', 'PQR311', '2023-10-02', 'ativo', 'Quadrante 3', 4);


select * from empresa;

