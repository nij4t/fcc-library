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

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      MongoClient.connect(MONGODB_CONNECTION_STRING)
      .then(db => {
        db.collection("books")
        .find({}).toArray().then( docs => {
          res.json(docs.map(doc => { return { _id: doc._id, title: doc.title, commentcount: doc.comments.length } } ))
        })
      })
    })
    
    .post(function (req, res){
      var title = req.body.title;
      if (!title) res.json({ error: 'No title provided.' })
      else MongoClient.connect(MONGODB_CONNECTION_STRING)
      .then(db => {
        const comments = []
        db.collection("books")
        .insertOne({ title, comments })
        .then( doc => {
          res.json({ _id: doc.insertedId, title, comments })
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