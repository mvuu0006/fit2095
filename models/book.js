const mongoose = require('mongoose');
let bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        validate: {
            validator: function (isbn_string) {
                return isbn_string.length == 13;
            },
            message: 'ISBN length should be 13'
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    created: {
        type: Date,
        default: Date.now
    },
    summary: String
});
module.exports = mongoose.model('Book', bookSchema);