const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  book_name: {
    type: String,
    required: true,
  },
  book_price: {
    type: Number,
    required: true,
    min: 50000,
    max: 100000,
    default: 50000
  },
});

module.exports = mongoose.model('Book', bookSchema);
