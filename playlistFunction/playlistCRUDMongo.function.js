const Playlist = require('../models/Playlist.model');
const mongoose = require('mongoose');
///////////////////////////////////////// READ MANY DOCUMENTS PLAYLIST /////////////////////////////////////

async function readAllDocumentsPlaylist() {
  const playlists = await Playlist.find({});
  return playlists;
}

async function readManyDocumentsPlaylistbymood(mood) {
  const playlists = await Playlist.find({
    mood: mood,
  });
  return playlists;
}

///////////////////////////////////////// READ ONE DOCUMENT PLAYLIST /////////////////////////////////////

async function readOneDocumentPlaylistbyname(name) {
  const playlist = await Playlist.findOne({
    name: name,
  });
  return playlist;
}

///////////////////////////////////////// ADD MANY DOCUMENTS PLAYLIST /////////////////////////////////////

async function addManyDocumentsPlaylist(playlistz) {
  const playlists = await Playlist.insertMany(playlistz);
  return playlists;
}

///////////////////////////////////////// ADD ONE DOCUMENT PLAYLIST /////////////////////////////////////

async function addOneDocumentPlaylist(req_body) {
  const playlist = await Playlist.create(req_body);
  return playlist;
}

///////////////////////////////////////// UPDATE MANY DOCUMENTS SONG /////////////////////////////////////

async function updateManyDocumentsPlaylistbystars(stars, stars_set) {
  const songs = await Playlist.updateMany(
    {
      stars: stars,
    },
    {
      $set: {
        stars: stars_set,
      },
    }
  );
  return songs;
}

///////////////////////////////////////// UPDATE ONE DOCUMENT PLAYLIST /////////////////////////////////////

async function updateOneDocumentPlaylistPush(name, songs_id_push) {
  try {
    const playlist = await Playlist.updateOne(
      {
        name: name,
      },
      {
        $push: {
          songs_id: {
            $each: songs_id_push.map((e) => new mongoose.Types.ObjectId(e)),
          },
        },
      }
    );
    return playlist;
  } catch (error) {
    return error.message;
  }
}

async function updateOneDocumentPlaylistPull(name, songs_id_pull) {
  try {
    const playlist = await Playlist.updateOne(
      {
        name: name,
      },
      {
        $pull: {
          songs_id: {
            $in: songs_id_pull.map((e) => new mongoose.Types.ObjectId(e)),
          },
        },
      }
    );
    return playlist;
  } catch (error) {
    return error.message;
  }
}

///////////////////////////////////////// DELETE MANY DOCUMENTS PLAYLIST /////////////////////////////////////

async function deleteAllDocumentsPlaylist() {
  const playlists = await Playlist.deleteMany({});
  return playlists;
}

async function deleteManyDocumentsPlaylistbymood(mood) {
  const playlists = await Playlist.deleteMany({
    mood: mood,
  });
  return playlists;
}

///////////////////////////////////////// DELETE ONE DOCUMENT PLAYLIST /////////////////////////////////////

async function deleteOneDocumentPlaylistbyname(name) {
  const playlist = await Playlist.deleteOne({
    name: name,
  });
  return playlist;
}

module.exports = {
  readAllDocumentsPlaylist,
  readManyDocumentsPlaylistbymood,
  readOneDocumentPlaylistbyname,
  addManyDocumentsPlaylist,
  addOneDocumentPlaylist,
  updateManyDocumentsPlaylistbystars,
  updateOneDocumentPlaylistPush,
  updateOneDocumentPlaylistPull,
  deleteAllDocumentsPlaylist,
  deleteManyDocumentsPlaylistbymood,
  deleteOneDocumentPlaylistbyname,
};
