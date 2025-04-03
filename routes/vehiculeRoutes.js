const express = require('express');
const router = express.Router();
const vehiculeController = require('../controllers/vehiculeController');


router.post('/vehicules', vehiculeController.createVehicule);
router.get('/vehicules', vehiculeController.getAllVehicules);
router.get('/vehicules/:id', vehiculeController.getVehiculeById);
router.put('/vehicules/:id', vehiculeController.updateVehicule);
router.delete('/vehicules/:id', vehiculeController.deleteVehicule);

module.exports = router;