const express = require('express');
const roomRouter = express.Router();

const { getDetailRoom, getFansLetter, liveInfoApi } = require('../controllers/room');

roomRouter.get('/profile/:roomId', getDetailRoom);
roomRouter.get('/fans-letter/:roomId', getFansLetter);
roomRouter.get('/live/:roomId', liveInfoApi)
roomRouter.get('/comments/:roomId', liveInfoApi)

module.exports = roomRouter;