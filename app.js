var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//bookAPI is the database we are connecting to
var db = mongoose.connect('mongodb://localhost/bookAPI', {useMongoClient: true});

var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var Router = express.Router();

Router.route('/Test')
    .post(function (req, res) {
        var book = new Book(req.body);
        //need a body parser for Express
        console.log(book);
        res.send(book);
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




app.use('/api', Router);

app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});