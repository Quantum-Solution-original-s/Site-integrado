var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cnpj = req.body.cnpjServer;
    var tabaco = req.body.tabacoServer;
    var dd = req.body.ddServer;
    var telefone = req.body.telefoneServer;
    var estufa = req.body.estufaServer;
    var plano = req.body.planoServer;
    // var fkEndereco = req.body.fkEndereco

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (tabaco == undefined) {
        res.status(400).send("Seu tabaco está undefined!");
    }else if (dd == undefined) {
        res.status(400).send("Seu DD está undefined!")
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (estufa == undefined) {
        res.status(400).send("Sua estufa está undefined!");
    } else if (plano == undefined) {
        res.status(400).send("Seu plano está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
            usuarioModel.cadastrar(cnpj, nome, email, senha, dd, telefone, plano, tabaco, estufa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function endereco(req, res) {
    var nome = req.body.nomeServer;
    var estado = req.body.estadoServer;
    var UF = req.body.UFServer
    var cidade = req.body.cidadeServer;
    var logradouro = req.body.logradouroServer;
    var numerolocal = req.body.numeroLocalServer;
    var bairro = req.body.bairroServer;
    var cep = req.body.cepServer


    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!")
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!")
    } else if (UF == undefined) {
        res.status(400).send("Seu UF está undefined!")
    } else if (cidade == undefined) {
        res.status(400).send("Seu cidade está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Sua logradouro está undefined!");
    } else if (numerolocal == undefined) {
        res.status(400).send("Seu numerolocal está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!")
    } else if (cep == undefined) {
        res.status(400).send("Seu CEP está undefined!")
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.endereco(nome, estado, UF, cidade, logradouro, numerolocal, bairro, cep)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function validacao(req, res) {
    usuarioModel.validacao()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
module.exports = {
    entrar,
    cadastrar,
    endereco,
    validacao
}