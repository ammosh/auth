var express = require('express');
var router = express.Router();

// controllers
var ctrlAuth = require('../controllers/auth');

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
