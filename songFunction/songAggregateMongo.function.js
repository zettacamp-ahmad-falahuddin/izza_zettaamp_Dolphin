const Song = require('../models/Song.model');

/////////////////////////////////////// MATCH //////////////////////////////////////////////

async function songsMatchArtist(artist) {
  const songs = await Song.aggregate([
    {
      $match: {
        artist: artist,
      },
    },
  ]);
  return songs;
}

async function songsSortGenre() {
  const songs = await Song.aggregate([
    {
      $sort: {
        genre: 1,
      },
    },
  ]);
  return songs;
}

async function songsLookupPlaylist() {
  const songs = await Song.aggregate([
    {
      $lookup: {
        from: 'playlists',
        localField: 'playlists_id',
        foreignField: '_id',
        as: 'playlists',
      },
    },
  ]);
  return songs;
}

async function songsFacet() {
  const songs = await Song.aggregate([
    {
      $facet: {
        categorizebyArtist: [{ $sortByCount: '$artist' }],
        categorizebyGenre: [{ $sortByCount: '$genre' }],
      },
    },
  ]);
  return songs;
}

async function songsGroupbyGenre() {
  const songs = await Song.aggregate([
    {
      $group: {
        _id: '$genre',
        songs: {
          $push: '$$ROOT',
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);
  return songs;
}

async function songsSkipandLimit(count, page) {
  const songs = await Song.aggregate([
    {
      $sort: {
        'duration.minute': 1,
        'duration.second': 1,
      },
    },
    {
      $skip: (page - 1) * count,
    },
    {
      $limit: count,
    },
  ]);
  return songs;
}

async function songAggregate(count, page, title) {
  const songs = await Song.aggregate([
    {
      $lookup: {
        from: 'playlists',
        localField: 'playlists_id',
        foreignField: '_id',
        as: 'playlists',
      },
    },
    {
      $facet: {
        categorizebyArtist: [
          {
            $group: {
              _id: '$artist',
              songs: {
                $push: '$$ROOT',
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
          {
            $skip: (page - 1) * count,
          },
          {
            $limit: count,
          },
          {
            $match: {
              'songs.title': title,
            },
          },
        ],
        categorizebyGenre: [
          {
            $group: {
              _id: '$genre',
              songs: {
                $push: '$$ROOT',
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
          {
            $skip: (page - 1) * count,
          },
          {
            $limit: count,
          },
          {
            $match: {
              'songs.title': title,
            },
          },
        ],
      },
    },
  ]);
  return songs;
}

module.exports = {
  songsMatchArtist,
  songsSortGenre,
  songsLookupPlaylist,
  songsFacet,
  songsGroupbyGenre,
  songsSkipandLimit,
  songAggregate,
};
