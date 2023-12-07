CREATE DATABASE QuantumSensors;

USE QuantumSensors;

-- CRIAÇÃO TABELAS

CREATE TABLE Endereco
(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
empresa varchar(100) NOT NULL,
estado VARCHAR(20) NOT NULL,
UF CHAR(2) NOT NULL,
cidade VARCHAR(50) NOT NULL,
logradouro VARCHAR(50) NOT NULL,
numero VARCHAR(4),
bairro VARCHAR(45) NOT NULL,
cep CHAR(8)
);
select * from empresa;
select * from endereco;

CREATE TABLE empresa
(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(14) UNIQUE NOT NULL,
nomeEmpresa VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
senha VARCHAR(20) NOT NULL,
ddd CHAR(3) NOT NULL, 
telefoneFixo CHAR(8) NOT NULL,
tipoPlano VARCHAR(20) NOT NULL,
CONSTRAINT chkPlano check(tipoPlano IN("Standart", "Premium")), 
dtAdesaoPlano DATETIME default current_timestamp,
tipoTabaco VARCHAR(45),
qtdEstufa varchar(5),
fkEndereco INT,
CONSTRAINT fkEnd FOREIGN KEY (fkEndereco)
	REFERENCES endereco (idEndereco)
);

SELECT * FROM sensor;

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
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
dt_horaAtual TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
temperatura DECIMAL(4,2),
umidade DECIMAL(4,2)
);

SELECT MAX(umidade) AS temperatura, MAX(temperatura) AS temperatura,
       CONCAT(HOUR(dt_horaAtual), ':', MINUTE(dt_horaAtual)) AS hora_e_minutos
FROM registro
GROUP BY hora_e_minutos ORDER BY hora_e_minutos DESC;

select * from empresa;

delete FROM empresa WHERE idEmpresa = 1;



select * from registro;
	
TRUNCATE registro;

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
INSERT INTO empresa (cnpj, nomeEmpresa, email, senha, ddd, telefoneFixo, tipoPlano, dtAdesaoPlano, tipoTabaco, fkEndereco ) VALUES
(23398926000182, 'Emporio Tabaco', 'cadastro@emporiodotabaco.com.br', '012b3222', 19, 35431550, 'QuantumStandard', '2023-10-23', 'Amarelinho', 5 ),
(26318116000167, 'Tabacaria Trevo', 'contabilidade@tabacariatrevo.com', 'tre9888', 21, 36716826, 'QuantumPremium', '2023-10-26', 'Amarelinho',6),
(47543145000100, 'Cigarrete Company', 'institucional@cigarretecompany.com', '0333ci', 42, 35938100, 'QuantumPremium', '2023-10-27', 'Virginia', 7),
(21942051000102, 'SutliffTobacco Company', "sutliffbacco@company.com", 'su7667', 62, 30974825, 'QuantumStandard', '2023-09-24', 'Virginia', 8);


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

-- REGISTROS
INSERT INTO registro (temperatura, umidade, fkSensor) VALUES
(18.2, 69, 1),
(17.4, 68, 2),
(20.5, 70, 3),
(19.3, 73, 4),
(24.1, 75, 5),
(22.3, 72, 6),
(23.5, 73, 7),
(28.3, 68, 8),
(19.3, 73, 9),
(24, 67, 10);


-- CONSULTAS SEPARADAS
SELECT * FROM empresa;
SELECT * FROM endereco;
SELECT * FROM registro;
SELECT * FROM sensor;
SELECT * FROM estufa;


-- CONSULTAS C/ JOIN

-- Dados da empresa e endereço
SELECT e.cnpj as 'CNPJ',
e.nomeEmpresa as 'Nome da Empresa', 
e.email as 'E-mail',
e.ddd,
e.telefoneFixo as 'Telefone Fixo', 
e.tipoPlano as 'Plano', 
e.dtAdesaoPlano as 'Data de adesão ao Plano', 
e.tipoTabaco as 'Tipo de Tabaco',
endereco.estado as 'Estado',
endereco.uf as 'UF',
endereco.cidade as 'Cidade',
endereco.logradouro as 'Logradouro',
endereco.bairro as 'Bairro',
endereco.numero as 'Numero',
endereco.cep as 'CEP'
FROM empresa as e
JOIN endereco
ON e.fkEndereco = endereco.idEndereco;

-- Sensor e registro e fkestufa
SELECT s.nome as 'Nome do Sensor', 
s.codigo as 'Codigo',
s.dtInstalacao as 'Data de Instalação',
s.statusSensor as 'Status do Sensor',
s.localizacaoSensorEstufa as 'Localização do Sensor na Estufa (Baseado em quadrantes)',
r.dt_horaAtual as 'Data e Hora Atual',
r.temperatura as 'Temperatura',
r.umidade as 'Umidade',
es.idEstufa as 'Id Estufa'
FROM sensor as s
LEFT JOIN registro as r ON r.fkSensor = s.idSensor
LEFT JOIN estufa as es ON s.fkEstufa = es.idEstufa;


-- Estufa e endereço
SELECT es.idEstufa as 'Id Estufa',
es.area as 'Área da Estufa',
es.capacidadeProducao as 'Capacidade de Produção de Mudas',
es.tipoestufa as 'Tipo da Estufa',
es.certificacao as 'Certificação',
es.dtPlantio as 'Data de Plantio',
es.dtColheita as 'Data de Colheita',
endereco.estado as 'Estado',
endereco.uf as 'UF',
endereco.cidade as 'Cidade',
endereco.logradouro as 'Logradouro',
endereco.bairro as 'Bairro',
endereco.numero as 'Numero',
endereco.cep as 'CEP'
FROM estufa as es
JOIN endereco
ON es.fkEndereco = endereco.idEndereco;

-- Estufa e empresa
SELECT es.idEstufa as 'Id Estufa',
es.area as 'Área da Estufa',
es.capacidadeProducao as 'Capacidade de Produção de Mudas',
es.tipoestufa as 'Tipo da Estufa',
es.certificacao as 'Certificação',
es.dtPlantio as 'Data de Plantio',
es.dtColheita as 'Data de Colheita',
e.cnpj as 'CNPJ',
e.nomeEmpresa as 'Nome da Empresa', 
e.email as 'E-mail',
e.ddd,
e.telefoneFixo as 'Telefone Fixo', 
e.tipoPlano as 'Plano', 
e.dtAdesaoPlano as 'Data de adesão ao Plano',
e.tipoTabaco as 'Tipo de Tabaco'
FROM estufa as es
JOIN empresa as e
ON e.idEmpresa= es.fkEmpresa;

-- Estufa com sensor
SELECT es.idEstufa as 'Id Estufa',
es.area as 'Área da Estufa',
es.capacidadeProducao as 'Capacidade de Produção de Mudas',
es.tipoestufa as 'Tipo da Estufa',
es.certificacao as 'Certificação',
es.dtPlantio as 'Data de Plantio',
es.dtColheita as 'Data de Colheita',
s.nome as 'Nome do Sensor', 
s.codigo as 'Codigo',
s.dtInstalacao as 'Data de Instalação',
s.statusSensor as 'Status do Sensor',
s.localizacaoSensorEstufa as 'Localização do Sensor na Estufa (Baseado em quadrantes)'
FROM estufa as es
JOIN sensor as s
ON s.fkEstufa = es.idEstufa;

-- TODAS AS TABELAS CONECTADAS
SELECT es.idEstufa as 'Id Estufa',
es.area as 'Área da Estufa',
es.capacidadeProducao as 'Capacidade de Produção de Mudas',
es.tipoestufa as 'Tipo da Estufa',
es.certificacao as 'Certificação',
es.dtPlantio as 'Data de Plantio',
es.dtColheita as 'Data de Colheita',
s.nome as 'Nome do Sensor', 
s.codigo as 'Codigo',
s.dtInstalacao as 'Data de Instalação',
s.statusSensor as 'Status do Sensor',
s.localizacaoSensorEstufa as 'Localização do Sensor na Estufa (Baseado em quadrantes)',
e.cnpj as 'CNPJ',
e.nomeEmpresa as 'Nome da Empresa', 
e.email as 'E-mail',
e.ddd,
e.telefoneFixo as 'Telefone Fixo', 
e.tipoPlano as 'Plano', 
e.dtAdesaoPlano as 'Data de adesão ao Plano',
e.tipoTabaco as 'Tipo de Tabaco',
endereco.estado as 'Estado',
endereco.uf as 'UF',
endereco.cidade as 'Cidade',
endereco.logradouro as 'Logradouro',
endereco.bairro as 'Bairro',
endereco.numero as 'Numero',
endereco.cep as 'CEP',
r.dt_horaAtual as 'Momento',
r.temperatura as 'Temperatura',
r.umidade as 'Umidade'
FROM estufa as es
JOIN sensor as s
ON s.fkEstufa = es.idEstufa
JOIN empresa as e
ON e.idEmpresa= es.fkEmpresa
JOIN endereco
ON es.fkEndereco = endereco.idEndereco
JOIN registro as r
ON r.fkSensor = s.idSensor;