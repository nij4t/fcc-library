/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.MONGOLAB_URI;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      // TODO: I can get /api/books to retrieve an aray of all books containing title, _id, & commentcount.
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      // TODO: I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id.
      var title = req.body.title;
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      // TODO: I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      // TODO: I can get /api/books/{_id} to retrieve a single object of a book containing title, _id, & an array of comments (empty array if no comments present).
      // TODO: If I try to request a book that doesn't exist I will get a 'no book exists' message.
      var bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      // TODO: I can post a comment to /api/books/{_id} to add a comment to a book and returned will be the books object similar to get /api/books/{_id}.
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      // TODO: I can delete /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful.
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};