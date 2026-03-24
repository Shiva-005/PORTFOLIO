const express = require('express');
const router = express.Router();

const { getLeetCodeStats } = require('../controllers/leetcodeController');

router.get('/:username', getLeetCodeStats);

module.exports = router;