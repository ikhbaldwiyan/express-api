const axios = require('axios');
const { room, live } = require('../utils/api');

let profile = [];
let schedule = '';
let liveInfo = [];
let liveTitle = '';
let comments = [];

// Get Profile API
const getProfile = (roomId) => {
    axios.get(`${room}/profile?room_id=${roomId}`)
    .then(response => {
        profile = response.data
    })
    .catch(error => {
        console.log(error);
    });
    return profile;
}

// Get Next Live API
const getSchedule = (roomId) => {
    axios.get(`${room}/next_live?room_id=${roomId}`)
    .then(response => {
        schedule = response.data.text
    })
    .catch(error => {
        console.log(error);
    });
    return schedule;
}

// Destrurct response profile
const profileData = (data) => {
    return {
        roomId: data.room_id,
        room_name: data.room_name,
        room_url_key: data.room_url_key,
        description: data.description,
        image: data.image,
        image_square: data.image_square,
        room_level: data.room_level,
        follower: data.follower_num,
        category: data.genre_name,
        avatar: data.avatar,
        schedule: getSchedule(data.room_id),
        is_onlive: data.is_onlive
    }
}

const getProfileRoom = (req, res) => {
    const roomId = req.params.roomId;
    const data = getProfile(roomId);
    const profile = profileData(data);

    if (roomId !== undefined) {
        res.send({profile});
    }
}

// Get Stream URL API
const getLiveInfo = (roomId) => {
    axios.get(`${live}/streaming_url?room_id=${roomId}`)
    .then(response => {
        liveInfo = response.data.streaming_url_list
    })
    .catch(error => {
        return error;
    });
    return liveInfo;
}

// Get Live Title
const getLiveTitle = (roomId) => {
    axios.get(`${live}/telop?room_id=${roomId}`)
    .then(response => {
        liveTitle = response.data.telop
    })
    .catch(error => {
        return error;
    });
    return liveTitle;
}

// Get Comments API 
const getComments = (roomId) => {
    axios.get(`${live}/comment_log?room_id=${roomId}`)
    .then(response => {
        comments = response.data.comment_log
    })
    .catch(error => {
        return error;
    });

    // filter comments
    let newComments = [];
    comments.map(item => {
        if (item.comment.length !== '2' && item.comment.length !== '1') {
            const newComment = {
                id: item.user_id,
                time: item.created_at,
                name: item.name,
                comment: item.comment,
                avatar_url: item.avatar_url
            }
            return newComments.push(newComment);
        }
    });

    return newComments;
}

// Destruct live info to routes
const liveInfoApi = (req, res) => {
    const roomId = req.params.roomId;
    const profileApi = getProfile(roomId);
    const streamUrl = getLiveInfo(roomId)
    const getTitle = getLiveTitle(roomId);
    const liveTime = profileApi.current_live_started_at;

    if (profileApi.is_onlive && roomId && comments) {
        res.send({
            name: profileApi.room_name,
            views: profileApi.view_num,
            liveTime: liveTime,
            title: getTitle,
            url: streamUrl,
            is_onlive: profileApi.is_onlive
        })
    } else {
        const name = profileApi.room_name;
        res.send({
            message: `${name} is not live`,
            is_onlive: profileApi.is_onlive
        })
    }
}

const commentApi = (req, res) => {
    const comments = getComments(req.params.roomId);
    res.send(comments)
}

module.exports = { getProfileRoom, liveInfoApi, commentApi };