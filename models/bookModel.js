var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creates the schema of the model
var bookModel = new Schema({
    title: {
        type: String
    },
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default: false}
});

//tells mongoose that we have a new model called Book
//this is returned in exports so that we can access it in other areas
//of the application
module.exports = mongoose.model('Book', bookModel);
