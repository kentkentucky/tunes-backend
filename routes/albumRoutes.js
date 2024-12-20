const express = require('express');
const router = express.Router();
const albumControllers = require('../controllers/albumController');

router.get('/', albumControllers.getAlbum);

module.exports = router;