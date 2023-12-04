var database = require("../database/config")

function entrar(email, senha) {


    var instrucao = `
        SELECT * FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
    }
    
// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(cnpj, nome, email, senha, dd, telefone, plano, tabaco, estufa) {

    var instrucao = `
        INSERT INTO empresa 
        (cnpj, nomeEmpresa, email, senha, ddd, telefoneFixo, tipoPlano, tipoTabaco, qtdEstufa) VALUES 
        (${cnpj}, '${nome}', '${email}', '${senha}', ${dd}, ${telefone}, '${plano}', '${tabaco}', ${estufa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function endereco(nome, estado, UF, cidade, logradouro, numerolocal, bairro, cep) {

    var instrucao = `
        INSERT INTO Endereco (empresa, estado, UF, cidade, logradouro, numero, bairro, cep) VALUES 
        ('${nome}', '${estado}', '${UF}', '${cidade}', '${logradouro}', ${numerolocal}, '${bairro}', ${cep});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function validacao() {
    var instrucao = `
    select idEmpresa from empresa;`;

    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    endereco,
    validacao
};