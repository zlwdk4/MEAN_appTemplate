var express = require('express');


var routes = function (Book) {
    var bookRouter = express.Router();

    bookRouter.route('/')
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
        })
        .patch();

    //this is middleware
    bookRouter.use('/:bookId', function (req, res, next) { //next is to tell it to move to the next thing that needs to be done
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            }
            else if (book) {
                req.book = book;
                next();
            }
            else { //book isn't found
                res.status(404).send('no book found');
            }
        });
    });
    bookRouter.route('/:bookId')
        .get(function (req, res) {
            res.json(req.book);

        })
        .put(function (req, res) {
            Book.findById(req.params.bookId, function (err, book) {
                req.book.title = req.body.title;
                req.book.author = req.body.author;
                req.book.genre = req.body.genre;
                req.book.read = req.body.read;
                req.book.save();
                res.json(req.book);
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;
            //use for in loop
            //for every key in body, will return key name
            for (var bookKeyValue in req.body) {
                req.book[bookKeyValue] = req.body[bookKeyValue];
            }

            req.book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else
                    res.json(req.book);
            })
        })
        .delete(function (req, res) {
            req.book.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.status(204).send('Removed');
                }
            })
        });
    return bookRouter;
};

module.exports = routes;