const express = require('express');
const router = express.Router();
const gfgController = require('../controllers/gfgController');

router.get('/:username', gfgController.getGFGProfile);

module.exports = router;
