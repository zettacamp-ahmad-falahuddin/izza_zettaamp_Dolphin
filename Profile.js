const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  address: {
    kota: String,
    provinsi: String,
  },
  hobbies: Array,
});

module.exports = mongoose.model('Profile', userSchema);
