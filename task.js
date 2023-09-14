const songList = [
  {
    title: 'Racing Into The Night',
    artist: 'Yoasobi',
    genre: 'JPop',
    duration: {
      minute: 4,
      second: 22,
    },
  },

  {
    title: 'Blue Bird',
    artist: 'Ikimono Gakari',
    genre: 'JPop',
    duration: '3:39',
    duration: {
      minute: 3,
      second: 39,
    },
  },

  {
    title: 'Hati-Hati di Jalan',
    artist: 'Tulus',
    genre: 'Pop',
    duration: {
      minute: 4,
      second: 22,
    },
  },

  {
    title: 'Akad',
    artist: 'Payung Teduh',
    genre: 'Pop',
    duration: {
      minute: 4,
      second: 17,
    },
  },

  {
    title: 'Fix You',
    artist: 'Cold Play',
    genre: 'EPop',
    duration: {
      minute: 4,
      second: 54,
    },
  },

  {
    title: 'The Scientist',
    artist: 'Cold Play',
    genre: 'EPop',
    duration: {
      minute: 4,
      second: 26,
    },
  },

  {
    title: 'Count On Me',
    artist: 'Bruno Mars',
    genre: 'EPop',
    duration: {
      minute: 4,
      second: 26,
    },
  },

  {
    title: 'Rhymes of Vales',
    artist: 'Yu Peng Chen',
    genre: 'Instrumental',
    duration: {
      minute: 4,
      second: 5,
    },
  },

  {
    title: 'Mondstadt Starlit',
    artist: 'Yu Peng Chen',
    genre: 'Instrumental',
    duration: {
      minute: 1,
      second: 0,
    },
  },
];

function filterByArtist(songList, artistName) {
  return songList.filter((e) => e.artist === artistName).map((e) => e);
}

function groupSongbyArtist(songList) {
  const artists = new Set(songList.map((e) => e.artist));

  const songGroup = [];

  for (let artist of artists) {
    songGroup.push({ artist: artist, song: filterByArtist(songList, artist) });
  }

  return songGroup;
}

function filterByGenre(songList, genre) {
  return songList.filter((e) => e.genre === genre).map((e) => e);
}

function groupSongbyGenre(songList) {
  const genres = new Set(songList.map((e) => e.genre));

  const songGroup = [];

  for (let genre of genres) {
    songGroup.push({ genre: genre, song: filterByGenre(songList, genre) });
  }

  return songGroup;
}

function pickSong(songList) {
  const randomSong = [];
  const songDurationOnly = songList.map((e) => e.duration.minute + e.duration.second / 60);
  const maxDuration = Math.max(...songDurationOnly);
  let minute = 0;

  while (minute <= 60 - maxDuration) {
    const random = Math.floor(Math.random() * songList.length);
    const min = parseInt(songList[random].duration.minute) + parseInt(songList[random].duration.second) / 60;
    minute += min;
    randomSong.push(songList[random]);
    // console.log('minute', minute);
  }

  return randomSong.map((e) => e);
}

/////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
  const username = req.body.username;

  const accesToken = jwt.sign({ name: username }, 'secret', { expiresIn: '1h' });

  res.json({ accessToken: accesToken });
});

app.use((req, res, next) => {
  const authheader = req.headers.authorization;

  if (!authheader) {
    let err = new Error('No authentication!');
    res.setHeader('WWW-Authenticate', 'Bearer');
    err.status = 401;
    return next(err);
  }

  const token = authheader.split(' ')[1];

  jwt.verify(token, 'secret', (err) => {
    if (err) res.sendStatus(403);
    next();
  });
});

app.get('/', (_, res) => {
  console.log('Selamat datang, wahai list song ada di response');

  res.json(songList);
});

app.get('/groupByArtist', (_, res) => {
  console.log('Selamat datang, wahai ini adalah endpoint groupByArtist');

  const groupofSongs = groupSongbyArtist(songList);

  res.json(groupofSongs);
});

app.get('/groupByGenre', (_, res) => {
  console.log('Selamat datang, wahai ini adalah endpoint groupByGenre');

  const groupofSongs = groupSongbyGenre(songList);

  res.json(groupofSongs);
});

app.get('/pickSong', (_, res) => {
  console.log('Selamat datang, wahai ini adalah endpoint pickSong');

  const groupofSongs = pickSong(songList);

  res.json(groupofSongs);
});

app.listen(3000);
