const Playlist = require('../models/Playlist.model');

/////////////////////////////////////// MATCH //////////////////////////////////////////////

async function playlistsMatchMood(mood) {
  const playlists = await Playlist.aggregate([
    {
      $match: {
        mood: mood,
      },
    },
  ]);
  return playlists;
}

async function playlistsSortname() {
  const playlists = await Playlist.aggregate([
    {
      $sort: {
        name: -1,
      },
    },
  ]);
  return playlists;
}

async function playlistsLookupSong() {
  const playlists = await Playlist.aggregate([
    {
      $lookup: {
        from: 'songs',
        localField: 'songs_id',
        foreignField: '_id',
        as: 'songs',
      },
    },
  ]);
  return playlists;
}

async function playlistsFacet() {
  const playlists = await Playlist.aggregate([
    {
      $facet: {
        categorizebyMood: [{ $sortByCount: '$mood' }],
        categorizebyStars: [{ $sortByCount: '$stars' }],
      },
    },
  ]);
  return playlists;
}

async function playlistsGroupbyMood() {
  const playlists = await Playlist.aggregate([
    {
      $group: {
        _id: '$mood',
        playlists: {
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
  return playlists;
}

async function playlistsSkipandLimit(count, page) {
  const playlists = await Playlist.aggregate([
    {
      $sort: {
        mood: -1,
      },
    },
    {
      $skip: (page - 1) * count,
    },
    {
      $limit: count,
    },
  ]);
  return playlists;
}

async function playlistAggregate(count, page, name) {
  const playlists = await Playlist.aggregate([
    {
      $lookup: {
        from: 'songs',
        localField: 'songs_id',
        foreignField: '_id',
        as: 'songs',
      },
    },
    {
      $facet: {
        categorizebyMood: [
          {
            $group: {
              _id: '$mood',
              playlists: {
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
              'playlists.name': name,
            },
          },
        ],
        categorizebyStars: [
          {
            $group: {
              _id: '$stars',
              playlists: {
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
              'playlists.name': name,
            },
          },
        ],
      },
    },
  ]);
  return playlists;
}

module.exports = {
  playlistsMatchMood,
  playlistsSortname,
  playlistsLookupSong,
  playlistsFacet,
  playlistsGroupbyMood,
  playlistsSkipandLimit,
  playlistAggregate,
};
