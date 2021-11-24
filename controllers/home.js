const axios = require('axios');
const { live, home } = require("../utils/api");

let rooms = [];
let onlives = [];

// Get Room List
const getRoomList = () => {
    roomLives = []
    axios.get(home)
    .then(response => {
        rooms = response.data
    }).catch(error => {
        console.log(error);
    });
    
    for (let i = 0; i < rooms.length; i++) {
        const index = rooms[i];
        if (index.name.includes("JKT48")) {
            roomLives.push(index)
        }
    }

    if (roomLives.length) {
        return roomLives;
    }
}

// Get Room Lives API
const getOnLives = () => {
    let onLive = [];
    let roomList = [];

    axios.get(`${live}/onlives`)
    .then(response => {
        onlives = response.data.onlives
    }).catch(error => {
       console.log(error)
    });
    
    for (let i = 0; i < onlives.length; i++) {
        const index = onlives[i];
        if (index.genre_name === "Idol") {
            onLive.push(index)
        }
    }

    if (onLive.length) {
        const roomLive = onLive[0].lives;
    
        roomLive.forEach(item => {
            if (item.room_url_key.includes('JKT48')) {
                roomList.push(item)
            }
        });
    } else {
        return {
            message: 'Member Not Live'
        }
    }

    if (onlives.length && roomList.length) {
        return roomList;
    }
}

// export router
const roomList = (req, res) => {
    const data = getRoomList();
    res.send(data)
}

const roomLive = (req, res) => {
    const onLives = getOnLives();
    res.send(onLives)
}

module.exports = { roomList, roomLive }