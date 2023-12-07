var database = require("../database/config");

function buscarUltimasMedidas() {

    var instrucaoSql = `SELECT MAX(umidade) AS umidade, MAX(temperatura) AS temperatura,
    CONCAT(HOUR(dt_horaAtual), ':', MINUTE(dt_horaAtual)) AS hora_e_minutos
FROM registro
GROUP BY hora_e_minutos ORDER BY hora_e_minutos DESC;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoReal() {

    instrucaoSql = `SELECT MAX(umidade) AS umidade, MAX(temperatura) AS temperatura,
    CONCAT(HOUR(dt_horaAtual), ':', MINUTE(dt_horaAtual)) AS hora_e_minutos
FROM registro
GROUP BY hora_e_minutos ORDER BY hora_e_minutos DESC;
    ` 

    // if (process.env.AMBIENTE_PROCESSO == "producao") {
    //     instrucaoSql = `SELECT MAX(umidade) AS umidade, MAX(temperatura) AS temperatura,
    //     CONCAT(HOUR(dt_horaAtual), ':', MINUTE(dt_horaAtual)) AS hora_e_minutos
    // FROM registro
    // GROUP BY hora_e_minutos ORDER BY hora_e_minutos DESC;
    //     `;

    // } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    //     instrucaoSql = `SELECT MAX(umidade) AS umidade, MAX(temperatura) AS temperatura,
    //     CONCAT(HOUR(dt_horaAtual), ':', MINUTE(dt_horaAtual)) AS hora_e_minutos
    // FROM registro
    // GROUP BY hora_e_minutos ORDER BY hora_e_minutos DESC;
    //     `;
    // } else {
    //     console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    //     return
    // }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
