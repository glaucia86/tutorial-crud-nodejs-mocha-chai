 /*
 * Arquivo: routes/livro.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável pelas rotas das APIS
 * Data: 18/10/2016
 */

let mongoose = require('mongoose');
let Livro = require('../models/livro');

/* 1) Método: Selecionar Livros (acessar em: GET http://localhost:3000/livro */
    function getLivros(req, res) {

        //Aqui estamos definindo a query do banco para que possa retornar todos os livros:
        let query = Livro.find({});
        query.exec((error, livros) => {
            if(error)
                res.send(error);
            //Caso não haja erros, então retornará para o cliente
            res.json(livros);
        });       
    }

/* 2) Método: Criar Livro (acessar em: POST http://localhost:3000/livro) */
    function postLivro(req, res) {

        //Criamos um novo livro:
        var novoLivro = new Livro(req.body);

        //Aqui estaremos salvando todos os campos na base de dados:
        novoLivro.save((error, livro) => {
            if(error) {
                res.send(error);
            } else {
                res.json({ message: "Livro adicionado com Sucesso!", livro });
            }
        });
    }