const express = require("express");
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(morgan('common'));
app.listen(8080);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
const url = "mongodb://localhost:27017/Week6";
const Author = require('./models/author');
const Book = require('./models/book');
const  mongoose  = require("mongoose");

app.use(express.static('css'));
app.use(express.static('images'));

mongoose.connect(url, function (err){
    if (err) throw err;
    else {
        console.log('Connect to DB successfully.')
    }
});

// Endpoints
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/home.html');
});

// Book enpoints
app.get('/addbook', function (req, res) {
    res.sendFile(__dirname + '/views/addBook.html');
});

app.post('/addnewbook', function (req, res) {
    let bookDetails = req.body;
    let book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: bookDetails.title,
        isbn: bookDetails.isbn,
        author: bookDetails.authorID,
        summary: bookDetails.summary
    });
    if (bookDetails.publicDate) book.created = bookDetails.publicDate;
    book.save(function (err) {
        if (err) {
            console.log(err);
            res.redirect('/addbook');}
        else {
            Author.findByIdAndUpdate(bookDetails.authorID, { $inc: { 'numBooks': 1 }}, function(err, doc) {
                if (err) {
                    console.log(err);
                    res.redirect('/addbook');}
                else res.redirect('/getallbooks');
            })
        }
    })
});

app.get('/getallbooks', function (req, res) {
    Book.find({}).populate('author').exec(function (err, books) {
        res.render('bookList', { booksDb: books });
    });
});

app.get('/deletebook', function (req, res) {
    res.sendFile(__dirname + '/views/deletebook.html');
});

app.post('/deletebookdata', function (req, res) {
    let bookDetails = req.body;
    Book.deleteOne({ 'isbn': bookDetails.isbn }, function (err, doc) {
        if (err) {
            console.log(err);
            res.redirect('/deletebook');
        }
        else res.redirect('/getallbooks');
    });
});

// Author endpoints
app.get('/addauthor', function (req, res) {
    res.sendFile(__dirname + '/views/addAuthor.html');
});

app.post('/addnewauthor', function (req, res) {
    let authorDetails = req.body;
    let author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: authorDetails.firstName,
            lastName: authorDetails.lastName
        },
        dob: authorDetails.dob,
        address: {
            state: authorDetails.state,
            suburb: authorDetails.suburb,
            street: authorDetails.street,
            unit: authorDetails.unit
        },
        numBooks: authorDetails.numBooks
    });
    author.save(function (err) {
        if (err) {
            console.log(err);
            res.redirect('/addauthor');}
        else res.redirect('/getallauthors');
    })
});

app.get('/getallauthors', function (req, res) {
    Author.find({}, function (err, authors) {
        res.render('authorList', { authorsDb: authors });
    })
});

app.get('/updateauthor', function (req, res) {
    res.sendFile(__dirname + '/views/updateAuthor.html');
});

app.post('/updateauthordata', function (req, res) {
    let request = req.body;
    Author.findByIdAndUpdate(request.id, { $set: { 'numBooks': request.newNumBooks }}, function(err, doc) {
        if (err) {
            console.log(err);
            res.redirect('/updateauthor');
        }
        else res.redirect('/getallauthors');
    })
});