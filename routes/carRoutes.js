const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/cars', carController.getAllCars);
router.post('/cars', carController.createCar);

module.exports = router;