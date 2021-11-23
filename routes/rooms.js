const express = require('express');
const router = express.Router();

const { getDetailRoom, getFansLetter, liveInfoApi } = require('../controllers/room');

router.get('/profile/:roomId', getDetailRoom);
router.get('/fans-letter/:roomId', getFansLetter);
router.get('/live/:roomId', liveInfoApi)
router.get('/comments/:roomId', liveInfoApi)

module.exports = router;