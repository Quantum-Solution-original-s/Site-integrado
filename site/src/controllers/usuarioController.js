var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoAquarios) => {
                                if (resultadoAquarios.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                        aquarios: resultadoAquarios
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
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


//         nomeServer: nomeVar,
//         emailServer: emailVar,
//         senhaServer: senhaVar,
//         cnpjServer: cnpjVar,
//         ddServer: ddVar,
//         telefoneServer: telefoneVar,
//         estufaServer: estadoVar,
//         planoServer: planoVar,
//         estadoServer: estadoVar,
//         cidadeServer: cidadeVar,
//         logradouroServer: logradouroVar,
//         localServer: localVar,
//         bairroServer: bairroVar,
//         cepServer: cepVar

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cnpj = req.body.cnpjServer;
    var dd = req.body.ddServer;
    var telefone = req.body.telefoneServer;
    var estufa = req.body.estufaServer;
    var plano = req.body.planoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (dd == undefined) {
        res.status(400).send("Seu DD está undefined!")
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (estufa == undefined) {
        res.status(400).send("Sua estufa está undefined!");
    } else if (plano == undefined) {
        res.status(400).send("Seu plano está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar, usuarioModel.endereco(nome, email, senha, cnpj, dd, telefone, estufa, plano)
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

function endereco() {
    var estado = req.body.estadoServer
    var cidade = req.body.cidadeServer;
    var logradouro = req.body.logradouroServer;
    var local = req.body.localServer;
    var bairro = req.body.bairroServer;
    var cep = req.body.cepServer


    if (plano == undefined) {
        res.status(400).send("Seu plano está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!")
    } else if (cidade == undefined) {
        res.status(400).send("Seu cidade está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Sua logradouro está undefined!");
    } else if (local == undefined) {
        res.status(400).send("Seu local está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!")
    } else if (cep == undefined) {
        res.status(400).send("Seu CEP está undefined!")
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.endereco(estado, cidade, logradouro, local, bairro, cep)
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

module.exports = {
    autenticar,
    cadastrar,
    endereco
}