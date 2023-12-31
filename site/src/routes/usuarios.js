var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/endereco", function(req, res){
    usuarioController.endereco(req,res);
})

router.get("/validacao", function (req, res) {
    usuarioController.validacao(req, res);
});

module.exports = router;