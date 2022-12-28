const { register, logout, login } = require('../controllers/authentication');
const express = require('express');
const router = express.Router();

router.post('/signup', register);
router.get('/logout', logout);
router.post('/login', login);

module.exports = router;