 /*
 * Arquivo: routes/livro.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável pelas rotas das APIS
 * Data: 18/10/2016
 */

var mongoose = require('mongoose');
var Livro = require('../models/livro');

/* 1) Método: Selecionar Livros (acessar em: GET http://localhost:3000/livro */
    function selecionarTodosLivros(req, res) {

        //Aqui estamos definindo a query do banco para que possa retornar todos os livros:
        var query = Livro.find({});
        query.exec(function(error, livros) {
            if(error)
                res.send(error);
            //Caso não haja erros, então retornará para o usuário:
            res.json(livros);
        });       
    }

/* 2) Método: Criar Livro (acessar em: POST http://localhost:3000/livro) */
    function adicionarLivro(req, res) {

        //Criamos um novo livro:
        var novoLivro = new Livro(req.body);

        //Aqui estaremos salvando todos os campos na base de dados:
        novoLivro.save(function(error, livro) {
            if(error) {
                res.send(error);
            } else {
                res.json({ message: "Livro adicionado com Sucesso!", livro });
            }
        });
    }

/** 3)  Método: Selecionar Por Id (acessar em: GET http://localhost:3000/livro/:id ) */ 
    function selecionarLivroPorId(req, res) {
        Livro.findById(req.params.id, function(error, livro) {
            if(error)
                res.send(error);

                //Caso não haja erros, retornar para o usuário:
                res.json(livro);
        });
    }

/** 4) Método: Excluir (acessar em: http://localhost:3000/livro/:id ) */ 
    function excluirLivro(req, res) {
        Livro.remove({ _id: req.params.id }, function(error, resultado) {
            res.json({ message: "Livro excluído com Sucesso!", resultado });
        });
    }
/* 5) Método: Atualizar (acessar em: PUT http://localhost:3000/livro/:id ) */
    function atualizarLivro(req, res) {
        //Para que eu possa atualizar um livro, preciso primeiramente encontrar o id do livro que desejo atualizar:
        Livro.findById({ _id: req.params.id }, function(error, livro) {
            if(error)
                res.send(error);
            
            //Caso não haja erros, retornar a atualização para o usuário:
            Object.assign(livro, req.body).save(function(error, livro) {
                if(error)
                    res.send(error);
                res.json({ message: "Livro Atualizado com Sucesso", livro });
            });
        });
    }

//Aqui iremos exportar todas as funções criadas acima:
module.exports = { selecionarTodosLivros, adicionarLivro, selecionarLivroPorId, excluirLivro, atualizarLivro };