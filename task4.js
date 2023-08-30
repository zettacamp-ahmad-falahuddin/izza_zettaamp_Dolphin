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

function pickSong(songList) {
    const randomSong = [];
    const songDurationOnly = songList.map((e) => e.duration.minute + e.duration.second/60);
    const maxDuration = Math.max(...songDurationOnly);
    // console.log('maxDuration', maxDuration);
    let minute = 0;

    while (minute <= 60 - maxDuration) {
        const random = Math.floor(Math.random() * songList.length);
        const min = parseInt(songList[random].duration.minute) + parseInt(songList[random].duration.second)/60;
        minute += min;
        // console.log('random', random);
        console.log('minute', minute);
        randomSong.push(songList[random]);
    }

    return randomSong.map((e) => e.title);
}

console.log(pickSong(songList));