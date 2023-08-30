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

function filterByGenre(songList, genre) {
    return songList
            .filter((e) => e.genre === genre)
            .map((e) => e.title);
}

function groupSongbyGenre(songList) {
    const genres = new Set(songList.map((e) => e.genre));

    const songGroup = [];
    
    for (let genre of genres) {
        songGroup.push({genre: genre, song: filterByGenre(songList,genre)});
    }

    return songGroup;
}

const result = groupSongbyGenre(songList) 

console.log('result', result);