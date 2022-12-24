const { register, logout, login } = require('../controllers/authentication');
const express = require('express');
const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;