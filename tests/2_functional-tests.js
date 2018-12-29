/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing tests', function() {

    var _id1

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({ title: 'Test Book Title' })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.property(res.body, '_id')
          assert.property(res.body, 'title')
          assert.equal(res.body.title, 'Test Book Title')
          _id1 = res.body._id
          done();
        })   
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'No title provided.')
          done();
        })
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response should be an array');
          assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
          assert.property(res.body[0], 'title', 'Books in array should contain title');
          assert.property(res.body[0], '_id', 'Books in array should contain _id');
          done();
        });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with invalid id',  function(done){
        chai.request(server)
        .get('/api/books/invalidId')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'error')
          done();
        })
      });

      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/5c261ca82beb965e0b310d17')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'error')
          done();
        })
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .get('/api/books/'+_id1)
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, '_id')
          assert.property(res.body, 'title')
          assert.property(res.body, 'comments')
          assert.isArray(res.body.comments);
          assert.equal(res.body._id, _id1)
          assert.equal(res.body.title, 'Test Book Title')
          done();
        })
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
        .post('/api/books/'+_id1)
        .send({ comment: 'test comment' })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, '_id')
          assert.property(res.body, 'title')
          assert.property(res.body, 'comments')
          assert.isArray(res.body.comments);
          assert.equal(res.body._id, _id1)
          assert.equal(res.body.title, 'Test Book Title')
          assert.equal(res.body.comments[0], 'test comment')
          done();
        })
      });

      test('Test POST /api/books/[id] with comment using invalid id', function(done){
        chai.request(server)
        .post('/api/books/invalidId')
        .send({ comment: 'test comment' })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'error')
          done();
        })
      });
      
    });

  });

});
