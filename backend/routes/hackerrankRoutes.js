const express = require('express');
const router = express.Router();
const hackerrankController = require('../controllers/hackerrankController');

router.get('/:username', hackerrankController.getHackerRankProfile);

module.exports = router;
