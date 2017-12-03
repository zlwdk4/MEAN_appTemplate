var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//bookAPI is the database we are connecting to
var db = mongoose.connect('mongodb://localhost/bookAPI', {useMongoClient: true});

var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3001;

//Loads middleware
//looks at body and sees if there are any json objects in it
//if there is, it will take that object and load it into req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var Router = express.Router();

Router.route('/Books')
    .post(function (req, res) {
        //req.body is pulled using the body parser middleware
        var book = new Book(req.body);
        //need a body parser for Express
        book.save();
        res.status(201).send(book);  //send status 201 which means created
        //we send book back to client because we want them to have the id of the book that they're posting
    })
    .get(function (req, res) {

        var query = {};
        //this if statement ensures the only thing that is able to be filtered is the genre attribute
        //if we didn't do this,  any random url would hit the database which isn't ideal
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        //Book.find takes a JSON object in its search, req.query is a json object
        //passing in that query adds a filter to the get on any of the json attributes
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(books);
            }
        });
    });


Router.route('/Books/:bookId')
    .get(function (req, res) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(book);
            }


        });

    });

app.use('/api', Router);

app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});