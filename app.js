var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/api', {useMongoClient: true});

var app = express();

var port = process.env.PORT || 3001;


var Router = express.Router();

Router.route('/Test')
    .get(function (req, res) {
        var responseJson = {hello: "this is my api"};

        res.json(responseJson);
    });

app.use('/api', Router);

app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});