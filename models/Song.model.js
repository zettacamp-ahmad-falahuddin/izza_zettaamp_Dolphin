const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  duration: {
    minute: {
      type: Number,
      required: true,
    },
    second: {
      type: Number,
      required: true,
    },
  },
  playlists_id: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
    required: true,
  },
});

module.exports = mongoose.model('Song', songSchema);
