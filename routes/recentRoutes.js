const express = require('express');
const router = express.Router();
const recentControllers = require('../controllers/recentController');

router.post('/add/album', recentControllers.addAlbum);
router.post('/add/playlist', recentControllers.addPlaylist);

module.exports = router;