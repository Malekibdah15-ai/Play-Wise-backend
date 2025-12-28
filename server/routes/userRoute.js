const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Routes
router.get('/', userController.findAllUsers);
router.get('/:id', userController.findOneSingleUser);
router.post('/register', userController.createNewUser);
router.post('/login',userController.loginUser);

module.exports = router;
