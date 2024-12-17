const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginController');

router.post('/', loginControllers.validateLogin);

module.exports = router;