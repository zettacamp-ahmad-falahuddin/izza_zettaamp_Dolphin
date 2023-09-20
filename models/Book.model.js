const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  book_name: {
    type: String,
    required: true,
  },
  book_price: {
    type: Number,
    required: true,
    min: 50000,
    max: 100000,
  },
  book_genre: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Book', bookSchema);
