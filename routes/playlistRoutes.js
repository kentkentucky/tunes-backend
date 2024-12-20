const express = require('express');
const router = express.Router();
const playlistControllers = require('../controllers/playlistController');

router.get('/', playlistControllers.getPlaylist);

module.exports = router;