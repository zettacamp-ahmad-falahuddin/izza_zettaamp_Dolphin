const Song = require('../models/Song.model');
const mongoose = require('mongoose')
///////////////////////////////////////// READ MANY DOCUMENTS SONG /////////////////////////////////////

async function readAllDocumentsSong() {
  const songs = await Song.find({});
  return songs;
}

async function readManyDcumentsSongbyArtist(artist) {
  const songs = await Song.find({
    artist: artist,
  });
  return songs;
}

///////////////////////////////////////// READ ONE DOCUMENT SONG /////////////////////////////////////

async function readOneDocumentSongbytitle(title) {
  const song = await Song.findOne({
    title: title,
  });
  return song;
}

///////////////////////////////////////// ADD MANY DOCUMENTS SONG /////////////////////////////////////

async function addManyDocumentsSong(songz) {
  const songs = await Song.insertMany(songz);
  return songs;
}

///////////////////////////////////////// ADD ONE DOCUMENT SONG /////////////////////////////////////

async function addOneDocumentSong(req_body) {
  const song = await Song.create(req_body);
  return song;
}

///////////////////////////////////////// UPDATE MANY DOCUMENTS SONG /////////////////////////////////////

async function updateManyDocumentsSongbyGenre(genre, genre_set) {
  const songs = await Song.updateMany(
    {
      genre: genre,
    },
    {
      $set: {
        genre: genre_set,
      },
    }
  );
  return songs;
}

///////////////////////////////////////// UPDATE ONE DOCUMENT SONG /////////////////////////////////////

async function updateOneDocumentSongPush(title, playlists_id_push) {
  try {
    const song = await Song.updateOne(
      {
        title: title,
      },
      {
        $push: {
          playlists_id: {
            $each: playlists_id_push.map((e) => new mongoose.Types.ObjectId(e)),
          },
        },
      }
    );
    return song;
  } catch (error) {
    return error.message;
  }
}

async function updateOneDocumentSongPull(title, playlists_id_pull) {
  try {
    const song = await Playlist.updateOne(
      {
        title: title,
      },
      {
        $pull: {
          playlists_id: {
            $in: playlists_id_pull.map((e) => new mongoose.Types.ObjectId(e)),
          },
        },
      }
    );
    return song;
  } catch (error) {
    return error.message;
  }
}

///////////////////////////////////////// DELETE MANY DOCUMENTS SONG /////////////////////////////////////

async function deleteAllDocumentsSong() {
  const songs = await Song.deleteMany({});
  return songs;
}

async function deleteManyDocumentsSongbyArtist(artist) {
  const songs = await Song.deleteMany({
    artist: artist,
  });
  return songs;
}

///////////////////////////////////////// DELETE ONE DOCUMENT SONG /////////////////////////////////////

async function deleteOneDocumentSongbytitle(title) {
  const song = await Song.deleteOne({
    title: title,
  });
  return song;
}

module.exports = {
  readAllDocumentsSong,
  readManyDcumentsSongbyArtist,
  readOneDocumentSongbytitle,
  addManyDocumentsSong,
  addOneDocumentSong,
  updateManyDocumentsSongbyGenre,
  updateOneDocumentSongPush,
  updateOneDocumentSongPull,
  deleteAllDocumentsSong,
  deleteManyDocumentsSongbyArtist,
  deleteOneDocumentSongbytitle,
};
