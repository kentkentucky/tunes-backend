const express = require('express');
const router = express.Router();
const searchControllers = require('../controllers/searchController');

router.get('/', searchControllers.spotifySearch);
router.get('/track', searchControllers.getTrack);

module.exports = router;