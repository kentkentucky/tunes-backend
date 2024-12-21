const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/homeController');

router.get('/recent', homeControllers.getRecents);

module.exports = router;