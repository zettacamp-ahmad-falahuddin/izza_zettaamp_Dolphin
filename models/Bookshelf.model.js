const mongoose = require('mongoose');

const bookshelfSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    min: 1,
  },
  books_id: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    validate: [
      {
        validator: (f) => f.length !== 0,
        message: 'books_id is empty',
      },
    ],
  },
});

module.exports = mongoose.model('Bookshelf', bookshelfSchema);
