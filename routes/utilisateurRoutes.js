const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

// Route
router.post('/register', utilisateurController.register);
router.get('/users', utilisateurController.getAllUsers);
router.post('/login', utilisateurController.login);


module.exports = router;
