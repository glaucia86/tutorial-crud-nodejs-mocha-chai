 /*
 * Arquivo: routes/livro.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável por realizar o TDD com Mocha & Chai no lado do server da nossa app.
 * Data: 21/10/2016
 * 
 */

process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Livro = require('../app/models/livro');

//Aqui estamos declarando as dependências necessárias para realizar os nossos testes!
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

//Aqui é o bloco principal que executará o nossos testes:
describe('Livros', function() {
    beforeEach(function(done) {

        //Sempre depois de executar o nosso teste, iremos limpar a nossa base de dados:
        Livro.remove({}, function(error) {
            done();
        });
    });
});

/** 
 * Teste da rota: /GET
 */
describe('/GET livro', function() {
    it('Deve retornar todos os livros', function(done) {
        chai.request(server)
        .get('/livro')
        .end(function(error, res) {
            //Se tudo der certo deve retornar o status: 200 - OK
            res.should.have.status(200);
            //E em seguida retornar em um array todos os livros cadastrados na base de dados:
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
        done();
        });
    });
});