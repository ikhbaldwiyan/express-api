const express = require('express');
const router = express.Router();

const { roomList, roomLive } = require('../controllers/home');

router.get('/', roomList);
router.get('/onlives', roomLive);

module.exports = router;

