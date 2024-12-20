const express = require('express');
const router = express.Router();
const artistControllers = require('../controllers/artistController');

router.get('/', artistControllers.getArtist);

module.exports = router;