const mongoose = require('mongoose');
let authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    dob: Date,
    address: {
        state: {
            type: String,
            validate: {
                validator: function (state_string) {
                    return state_string.length >= 2 && state_string.length <= 3;
                },
                message: 'State length should be a number between 2 and 3'
            }
        },
        suburb: String,
        street: String,
        unit: String
    },
    numBooks: {
        type: Number,
        validate: {
            validator: function (number_of_books) {
                return number_of_books >= 1 && number_of_books <= 150;
            },
            message: 'Number of books should be a number between 1 and 150'
        },
        default: 1
    }
});
module.exports = mongoose.model('Author', authorSchema);