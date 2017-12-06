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

bookRouter = require('./Routes/bookRoutes')(Book); //injects Book model into the Router


app.use('/api/Books', bookRouter); //adding /Books at Router use level allows us to separate more (more RESTy)
//can do  app.use('/api/author', authorRouter);

app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});