const express = require('express');
const router = express.Router();
const vehiculeController = require('../controllers/vehiculeController');

router.get('/vehicules', vehiculeController.getAllVehicules);
router.post('/vehicules', vehiculeController.createVehicule);

module.exports = router;