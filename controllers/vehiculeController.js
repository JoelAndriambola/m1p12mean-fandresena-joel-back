const Vehicule = require('../models/vehicule');

// Get all vehicules
exports.getAllVehicules = async (req, res) => {
  try {
    const vehicules = await Vehicule.find();
    res.json(vehicules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new vehicule
exports.createVehicule = async (req, res) => {
  const vehicule = new Vehicule({
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year
  });

  try {
    const newVehicule = await vehicule.save();
    res.status(201).json(newVehicule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};