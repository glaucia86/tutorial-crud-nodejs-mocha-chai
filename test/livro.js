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
            //res.body.length.should.be.eql(0);
        done();
        });
    });
});

/** 
 * Teste da rota: /POST
 */
describe('/POST livro', function() {
    it('Não deve retornar o POST do livro criado, uma vez que não foi definido o campo: paginas', function(done) {
       
        //Aqui simulamos a criação de um livro, porém sem definir a página do livro:
        var livro = {
            titulo: "Javascript. O Guia Definitivo",
            autor: "David Flanagan",
            ano: 2012
        }
        chai.request(server)
        .post('/livro')
        .send(livro)
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('paginas');
            res.body.errors.paginas.should.have.property('kind').eql('required');
            done();
        });
    });
    
    it('Deve Criar um livro', function(done) {
        var livro = {
            titulo: "Javascript. O Guia Definitivo",
            autor: "David Flanagan",
            paginas:1080,
            ano: 2012
        } 
        chai.request(server)
        .post('/livro')
        .send(livro)
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Livro adicionado com Sucesso!');
            res.body.livro.should.have.property('titulo');
            res.body.livro.should.have.property('autor');
            res.body.livro.should.have.property('paginas');
            res.body.livro.should.have.property('ano');
        done();
        }); 
    });
});


/** 
 * Teste da rota: /GET/:id
 */
describe('/GET/:id livro', function() {
    it('Deve retornar um livro dado o id', function() {
        var livro = new Livro( {
            titulo: "Javascript. O Guia Definitivo",
            autor: "David Flanagan",
            paginas:1080,
            ano: 2012
        });
        livro.save(function(error, livro) {
            chai.request(server)
            .get('/livro/' + livro.id)
            .send(livro)
            .end(function(error, res) {
               res.should.be.a('object');
               res.body.should.have.property('titulo'); 
               res.body.should.have.property('autor');
               res.body.should.have.property('paginas');
               res.body.should.have.property('ano');
               res.body.should.have.property('_id').eql(livro.id);              
        done();
            });
        });
    });
});
