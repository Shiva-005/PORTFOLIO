const express = require('express');
const router = express.Router();
const { getGfgStats } = require('../controllers/gfgController');

router.get('/:username', getGfgStats);

module.exports = router;