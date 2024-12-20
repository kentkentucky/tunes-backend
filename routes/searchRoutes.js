const express = require('express');
const router = express.Router();
const searchControllers = require('../controllers/searchController');

router.get('/', searchControllers.spotifySearch);

module.exports = router;