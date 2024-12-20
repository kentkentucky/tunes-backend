const express = require('express');
const router = express.Router();
const searchControllers = require('../controllers/searchController');

router.get('/', searchControllers.spotifySearch);
router.get('/track', searchControllers.getTrack);
router.get('/artist', searchControllers.getArtist);
router.get('/album', searchControllers.getAlbum);
router.get('/playlist', searchControllers.getPlaylist);
router.get('/recent', searchControllers.getRecent);

router.post('/add/album', searchControllers.addAlbum);
router.post('/add/artist', searchControllers.addArtist);
router.post('/add/playlist', searchControllers.addPlaylist);
router.post('/add/track', searchControllers.addTrack);

module.exports = router;