const express = require('express');
const router = express.Router();
const searchControllers = require('../controllers/searchController');

router.get('/', searchControllers.spotifySearch);
router.get('/track', searchControllers.getTrack);
router.get('/artist', searchControllers.getArtist);
router.get('/album', searchControllers.getAlbum);
router.get('/playlist', searchControllers.getPlaylist);

module.exports = router;