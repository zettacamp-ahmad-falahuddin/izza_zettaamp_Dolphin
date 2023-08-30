const songList = [
    
    {
        title: "Racing Into The Night",
        artist: "Yoasobi",
        genre: "JPop",
        duration: {
            minute: 4,
            second: 22,
        },   
    },

    {
        title: "Blue Bird",
        artist: "Ikimono Gakari",
        genre: "JPop",
        duration: "3:39",
        duration: {
            minute: 3,
            second: 39,
        },    
    },

    {
        title: "Hati-Hati di Jalan",
        artist: "Tulus",
        genre: "Pop",
        duration: {
            minute: 4,
            second: 22,
        },   
    },

    {
        title: "Akad",
        artist: "Payung Teduh",
        genre: "Pop",
        duration: {
            minute: 4,
            second: 17,
        },   
    },

    {
        title: "Fix You",
        artist: "Cold Play",
        genre: "EPop",
        duration: {
            minute: 4,
            second: 54,
        },   
    },

    {
        title: "The Scientist",
        artist: "Cold Play",
        genre: "EPop",
        duration: {
            minute: 4,
            second: 26,
        },   
    },

    {
        title: "Count On Me",
        artist: "Bruno Mars",
        genre: "EPop",
        duration: {
            minute: 4,
            second: 26,
        },   
    },

    {
        title: "Rhymes of Vales",
        artist: "Yu Peng Chen",
        genre: "Instrumental",
        duration: {
            minute: 4,
            second: 5,
        },   
    },
    
    {
        title: "Mondstadt Starlit",
        artist: "Yu Peng Chen",
        genre: "Instrumental",
        duration: {
            minute: 1,
            second: 0,
        },   
    },
];

function filterByArtist(songList, artistName) {
    return songList
            .filter((e) => e.artist === artistName)
            .map((e) => e.title);
}

function groupSongbyArtist(songList) {
    const artists = new Set(songList.map((e) => e.artist));

    const songGroup = [];
    
    for (let artist of artists) {
        songGroup.push({artist: artist, song: filterByArtist(songList,artist)});
    }

    return songGroup;
}

const result = groupSongbyArtist(songList) 

console.log(result);