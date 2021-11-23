const express = require('express');
const router = express.Router();

const { getProfileRoom, liveInfoApi, commentApi } = require('../controllers/room');

router.get('/profile/:roomId', getProfileRoom);
router.get('/live/:roomId', liveInfoApi)
router.get('/comments/:roomId', commentApi)

module.exports = router;