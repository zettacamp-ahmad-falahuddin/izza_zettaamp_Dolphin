const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  favourite_books_id: {
    type: [Number],
    required: true,
    min: 1,
    max: 9,
    validate: [
      {
        validator: (f) => f.length !== 0,
        message: 'favourite_books_id is empty',
      },
      {
        validator: (f) => Math.max(...f) <= 9 && Math.min(...f) >= 1,
        message: 'favourite_books_id out of bound',
      },
    ],
  },
});

module.exports = mongoose.model('User', userSchema);
