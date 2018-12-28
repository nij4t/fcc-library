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
var ObjectId = require('mongodb').ObjectID;
const MONGODB_CONNECTION_STRING = process.env.MONGOLAB_URI;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      // TODO: I can get /api/books to retrieve an aray of all books containing title, _id, & commentcount.
      MongoClient.connect(MONGODB_CONNECTION_STRING)
      .then(db => {
        db.collection("books")
        .find({}).toArray().then( docs => {
          // TODO: Implement commentcount
          res.json(docs.map(doc => Object.assign(doc, { commentcount: 0 }))) // hardcoded commentcount
        })
      })
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      var title = req.body.title;
      if (!title) res.json({ error: 'No title provided.' })
      else MongoClient.connect(MONGODB_CONNECTION_STRING)
      .then(db => {
        db.collection("books")
        .insertOne({ title })
        .then( doc => {
          res.json({ _id: doc.insertedId, title })
        })
      })
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
      if (bookid.length !== 24) res.json({ error: 'Invalid book id.' })
      bookid = new ObjectId(bookid)
      MongoClient.connect(MONGODB_CONNECTION_STRING)
      .then(db => {
        db.collection("books")
          .findOne({ _id: bookid })
          .then(doc => {
            if (!doc) res.json({ error: 'Invalid book id.' })
            else res.json(doc)
          })
          .catch(err => res.json({ error: 'Invalid book id.' }))
        })
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