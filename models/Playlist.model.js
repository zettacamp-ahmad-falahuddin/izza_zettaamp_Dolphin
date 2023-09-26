const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  songs_id: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    required: true,
  },
});

module.exports = mongoose.model('Playlist', playlistSchema);
