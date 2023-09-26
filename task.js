const express = require('express');
const mongoose = require('mongoose');

const app = express();

const songs = [
  {
    title: 'Racing Into The Night',
    artist: 'Yoasobi',
    genre: 'JPop',
    duration: {
      minute: 4,
      second: 22,
    },
    playlists_id: [],
  },
  {
    title: 'Blue Bird',
    artist: 'Ikimono Gakari',
    genre: 'JPop',
    duration: {
      minute: 3,
      second: 39,
    },
    playlists_id: [],
  },
  {
    title: 'Hati-Hati di Jalan',
    artist: 'Tulus',
    genre: 'Pop',
    duration: {
      minute: 4,
      second: 22,
    },
    playlists_id: [],
  },
  {
    title: 'Akad',
    artist: 'Payung Teduh',
    genre: 'Pop',
    duration: {
      minute: 4,
      second: 17,
    },
    playlists_id: [],
  },
  {
    title: 'Fix You',
    artist: 'Cold Play',
    genre: 'EPop',
    duration: {
      minute: 4,
      second: 54,
    },
    playlists_id: [],
  },
  {
    title: 'The Scientist',
    artist: 'Cold Play',
    genre: 'EPop',
    duration: {
      minute: 4,
      second: 26,
    },
    playlists_id: [],
  },
  {
    title: 'Count On Me',
    artist: 'Bruno Mars',
    genre: 'EPop',
    duration: {
      minute: 4,
      second: 26,
    },
    playlists_id: [],
  },
  {
    title: 'Rhymes of Vales',
    artist: 'Yu Peng Chen',
    genre: 'Instrumental',
    duration: {
      minute: 4,
      second: 5,
    },
    playlists_id: [],
  },
  {
    title: 'Mondstadt Starlit',
    artist: 'Yu Peng Chen',
    genre: 'Instrumental',
    duration: {
      minute: 1,
      second: 0,
    },
    playlists_id: [],
  },
];

const {
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
} = require('./songFunction/songCRUDMongo.function');

const {
  songsMatchArtist,
  songsSortGenre,
  songsLookupPlaylist,
  songsFacet,
  songsGroupbyGenre,
  songsSkipandLimit,
  songAggregate,
} = require('./songFunction/songAggregateMongo.function');

const Song = require('./models/Song.model');

const playlists = [
  {
    name: 'Playlist1',
    mood: 'Joy',
    stars: 5,
    songs_id: [],
  },
  {
    name: 'Playlist2',
    mood: 'Sad',
    stars: 5,
    songs_id: [],
  },
  {
    name: 'Playlist3',
    mood: 'Joy',
    stars: 4,
    songs_id: [],
  },
  {
    name: 'Playlist4',
    mood: 'Sad',
    stars: 3,
    songs_id: [],
  },
  {
    name: 'Playlist5',
    mood: 'Sad',
    stars: 4,
    songs_id: [],
  },
];

const {
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
} = require('./playlistFunction/playlistCRUDMongo.function');

const {
  playlistsMatchMood,
  playlistsSortname,
  playlistsLookupSong,
  playlistsFacet,
  playlistsGroupbyMood,
  playlistsSkipandLimit,
  playlistAggregate,
} = require('./playlistFunction/playlistAggregateMongo.function');

const Playlist = require('./models/Playlist.model');

/////////////////////////////////////////////////// MONGODB ///////////////////////////////////////////////////////

async function connectMongoDB() {
  await mongoose
    .connect('mongodb://localhost:27017/belajar', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      try {
        // await Song.insertMany(songs);
        // await Playlist.insertMany(playlists);
      } catch (error) {
        return error.message;
      }
      console.log('Berhasil terkoneksi mongodb');
    })
    .catch((err) => console.log(err.message));
}

connectMongoDB();

app.use(express.json());

/////////////////////////////////////////////////// SONG ///////////////////////////////////////////////////////

app.get('/songs', async (_, res) => {
  console.log('Selamat datang, wahai list song ada di response');

  const songs = await readAllDocumentsSong();

  res.json(songs);
});

// app.get('/songs/byArtist', async (req, res) => {
//   console.log('Selamat datang, wahai list song ada di response');

//   const { artist } = req.body;

//   const songs = await readManyDcumentsSongbyArtist(artist);

//   res.json(songs);
// });

// app.get('/song/bytitle', async (req, res) => {
//   console.log('Selamat datang, wahai song ada di response');

//   const { title } = req.body;

//   const song = await readOneDocumentSongbytitle(title);

//   res.json(song);
// });

// app.post('/songs/addSongs', async (req, res) => {
//   console.log('Selamat datang, wahai list song ada di response');

//   const songs = await addManyDocumentsSong(req.body);

//   res.json(songs);
// });

app.post('/song/addSong', async (req, res) => {
  console.log('Selamat datang, wahai song ada di response');

  const song = await addOneDocumentSong(req.body);

  res.json(song);
});

app.post('/songs/updateSongsbyGenre', async (req, res) => {
  console.log('Selamat datang, wahai list song ada di response');

  const { genre, genre_set } = req.body;

  const songs = await updateManyDocumentsSongbyGenre(genre, genre_set);

  res.json(songs);
});

app.post('/song/updateSongbytitle', async (req, res) => {
  console.log('Selamat datang, wahai song ada di response');

  const { title, playlists_id_push, playlists_id_pull } = req.body;

  if (playlists_id_pull === undefined) {
    const song = await updateOneDocumentSongPush(title, playlists_id_push);
    res.json(song);
  } else if (playlists_id_push === undefined) {
    const song = await updateOneDocumentSongPull(title, playlists_id_pull);
    res.json(song);
  } else if (playlists_id_pull !== undefined && playlists_id_push !== undefined) {
    let song = await updateOneDocumentSongPush(title, playlists_id_push);
    const message1 = song;
    song = await updateOneDocumentSongPull(title, playlists_id_pull);

    res.json({
      push: message1,
      pull: song,
    });
  }
});

// app.post('/songs/deleteSongs', async (_, res) => {
//   console.log('Selamat datang, wahai list song ada di response');

//   const songs = await deleteAllDocumentsSong();

//   res.json(songs);
// });

// app.post('/songs/deleteSongsbyArtist', async (req, res) => {
//   console.log('Selamat datang, wahai list song ada di response');

//   const { artist } = req.body;

//   const songs = await deleteManyDocumentsSongbyArtist(artist);

//   res.json(songs);
// });

app.post('/song/deleteSongbytitle', async (req, res) => {
  console.log('Selamat datang, wahai list song ada di response');

  const { title } = req.body;

  const song = await deleteOneDocumentSongbytitle(title);

  res.json(song);
});

///

// app.get('/songs/songsMatchArtist', async (req, res) => {
//   console.log('Selamat datang, wahai list song ada di response');

//   const { artist } = req.body;

//   const songs = await songsMatchArtist(artist);

//   res.json(songs);
// });

// app.get('/songs/songsSortGenre', async (_, res) => {
//   console.log('Selamat datang, wahai list song ada di response');

//   const songs = await songsSortGenre();

//   res.json(songs);
// });

// app.get('/songs/songsLookupPlaylist', async (_, res) => {
//   console.log('Selamat datang, wahai list song ada di response');

//   const songs = await songsLookupPlaylist();

//   res.json(songs);
// });

// app.get('/songs/songsFacet', async (_, res) => {
//   console.log('Selamat datang, wahai list song ada di response');

//   const songs = await songsFacet();

//   res.json(songs);
// });

// app.get('/songs/songsGroupbyGenre', async (_, res) => {
//   console.log('Selamat datang, wahai list song ada di response');

//   const songs = await songsGroupbyGenre();

//   res.json(songs);
// });

// app.get('/songs/songsSkipandLimit', async (req, res) => {
//   console.log('Selamat datang, wahai list song ada di response');

//   const { count, page } = req.body;

//   const songs = await songsSkipandLimit(count, page);

//   res.json(songs);
// });

app.get('/songs/songsAggregatematchbyTitle', async (req, res) => {
  console.log('Selamat datang, wahai list playlist ada di response');

  const { count, page, title } = req.body;

  const songs = await songAggregate(count, page, title);

  res.json(songs);
});

/////////////////////////////////////////////////// PLAYLIST ///////////////////////////////////////////////////////

app.get('/playlists', async (_, res) => {
  console.log('Selamat datang, wahai list playlist ada di response');

  const playlists = await readAllDocumentsPlaylist();

  res.json(playlists);
});

// app.get('/playlists/bymood', async (req, res) => {
//   console.log('Selamat datang, wahai list playlist ada di response');

//   const { mood } = req.body;

//   const playlists = await readManyDocumentsPlaylistbymood(mood);

//   res.json(playlists);
// });

// app.get('/playlist/byname', async (req, res) => {
//   console.log('Selamat datang, wahai playlist ada di response');

//   const { name } = req.body;

//   const playlist = await readOneDocumentPlaylistbyname(name);

//   res.json(playlist);
// });

// app.post('/playlists/addPlaylists', async (req, res) => {
//   console.log('Selamat datang, wahai list playlist ada di response');

//   const playlists = await addManyDocumentsPlaylist(req.body);

//   res.json(playlists);
// });

app.post('/playlist/addPlaylist', async (req, res) => {
  console.log('Selamat datang, wahai playlist ada di response');

  const playlist = await addOneDocumentPlaylist(req.body);

  res.json(playlist);
});

// app.post('/playlists/updatePlaylistsbyStars', async (req, res) => {
//   console.log('Selamat datang, wahai list playlist ada di response');

//   const { stars, stars_set } = req.body;

//   const playlists = await updateManyDocumentsPlaylistbystars(stars, stars_set);

//   res.json(playlists);
// });

app.post('/playlist/updatePlaylistbyname', async (req, res) => {
  console.log('Selamat datang, wahai playlist ada di response');

  const { name, songs_id_push, songs_id_pull } = req.body;

  if (songs_id_pull === undefined) {
    const playlist = await updateOneDocumentPlaylistPush(name, songs_id_push);
    res.json(playlist);
  } else if (songs_id_push === undefined) {
    const playlist = await updateOneDocumentPlaylistPull(name, songs_id_pull);
    res.json(playlist);
  } else if (songs_id_pull !== undefined && songs_id_push !== undefined) {
    let playlist = await updateOneDocumentPlaylistPush(name, songs_id_push);
    const message1 = playlist;
    playlist = await updateOneDocumentPlaylistPull(name, songs_id_pull);

    res.json({
      push: message1,
      pull: playlist,
    });
  }
});

// app.post('/playlists/deletePlaylists', async (_, res) => {
//   console.log('Selamat datang, wahai list playlist ada di response');

//   const playlists = await deleteAllDocumentsPlaylist();

//   res.json(playlists);
// });

// app.post('/playlists/deletePlaylistsbymood', async (req, res) => {
//   console.log('Selamat datang, wahai list playlist ada di response');

//   const { mood } = req.body;

//   const playlists = await deleteManyDocumentsPlaylistbymood(mood);

//   res.json(playlists);
// });

app.post('/playlist/deletePlaylistbyname', async (req, res) => {
  console.log('Selamat datang, wahai playlist ada di response');

  const { name } = req.body;

  const playlist = await deleteOneDocumentPlaylistbyname(name);

  res.json(playlist);
});

///

// app.get('/playlists/playlistsMatchMood', async (req, res) => {
//   console.log('Selamat datang, wahai list playlist ada di response');

//   const { mood } = req.body;

//   const playlists = await playlistsMatchMood(mood);

//   res.json(playlists);
// });

// app.get('/playlists/playlistsSortname', async (_, res) => {
//   console.log('Selamat datang, wahai list playlist ada di response');

//   const playlists = await playlistsSortname();

//   res.json(playlists);
// });

// app.get('/playlists/playlistsLookupSong', async (_, res) => {
//   console.log('Selamat datang, wahai list playlist ada di response');

//   const playlists = await playlistsLookupSong();

//   res.json(playlists);
// });

// app.get('/playlists/playlistsFacet', async (_, res) => {
//   console.log('Selamat datang, wahai list playlist ada di response');

//   const playlists = await playlistsFacet();

//   res.json(playlists);
// });

// app.get('/playlists/playlistsGroupbyMood', async (_, res) => {
//   console.log('Selamat datang, wahai list playlist ada di response');

//   const playlists = await playlistsGroupbyMood();

//   res.json(playlists);
// });

// app.get('/playlists/playlistsSkipandLimit', async (req, res) => {
//   console.log('Selamat datang, wahai list playlist ada di response');

//   const { count, page } = req.body;

//   const playlists = await playlistsSkipandLimit(count, page);

//   res.json(playlists);
// });

app.get('/playlists/playlistsAggregatematchbyName', async (req, res) => {
  console.log('Selamat datang, wahai list playlist ada di response');

  const { count, page, name } = req.body;

  const playlists = await playlistAggregate(count, page, name);

  res.json(playlists);
});

app.listen(3000);
