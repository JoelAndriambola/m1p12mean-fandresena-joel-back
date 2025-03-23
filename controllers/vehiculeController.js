const Vehicule = require('../models/Vehicule');
const { v4: uuidv4 } = require('uuid');
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
    plaque_immatriculation: req.body.plaque_immatriculation,
    marque: req.body.marque,
    modele: req.body.modele, 
    annee: req.body.annee, 
    utilisateur_id: req.body.utilisateur_id,  
    id: uuidv4(),
  });

  try {
    const newVehicule = await vehicule.save();
    res.status(201).json({ message: "Voiture enregistrée avec succès", vehicule: newVehicule });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
