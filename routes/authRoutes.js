const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authController');

router.get('/', authControllers.getAuth);

router.post('/token', authControllers.requestAccessToken);

module.exports = router;