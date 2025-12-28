const express = require('express');
const router = express.Router();
const MesController = require('../controllers/messageController.js');



router.get('/:genreSlug', MesController.findMessagesByGenre);
router.get('/',MesController.getAll)

module.exports = router;
