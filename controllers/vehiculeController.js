const Vehicule = require('../models/Vehicule');
const { v4: uuidv4 } = require('uuid');

// Enregistrer un nouveau véhicule
exports.createVehicule = async (req, res) => {
  try {
    const { plaque_immatriculation, marque, modele, annee, utilisateur_id } = req.body;

    // Vérifier si le véhicule existe déjà
    const existingVehicule = await Vehicule.findOne({ plaque_immatriculation });
    if (existingVehicule) {
      return res.status(400).json({ message: 'Ce véhicule existe déjà.' });
    }

    // Créer un nouveau véhicule
    const newVehicule = new Vehicule({
      plaque_immatriculation,
      marque,
      modele,
      annee,
      utilisateur_id,
    });

    await newVehicule.save();

    res.status(201).json({ message: 'Véhicule enregistré avec succès !', vehicule: newVehicule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer tous les véhicules
exports.getAllVehicules = async (req, res) => {
  try {
    // Récupérer tous les véhicules avec les informations du propriétaire
    const vehicules = await Vehicule.find().populate('utilisateur_id', 'prenom nom');

    if (!vehicules || vehicules.length === 0) {
      return res.status(404).json({ message: 'Aucun véhicule trouvé' });
    }

    res.status(200).json(vehicules);
  } catch (error) {
    console.error('Erreur lors de la récupération des véhicules :', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Récupérer un véhicule par ID
exports.getVehiculeById = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicule = await Vehicule.findById(id);

    if (!vehicule) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    res.status(200).json(vehicule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Mettre à jour un véhicule
exports.updateVehicule = async (req, res) => {
  try {
    const { id } = req.params;
    const { plaque_immatriculation, marque, modele, annee, utilisateur_id } = req.body;

    const updatedFields = { plaque_immatriculation, marque, modele, annee, utilisateur_id };

    const updatedVehicule = await Vehicule.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    if (!updatedVehicule) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    res.status(200).json({ message: 'Véhicule mis à jour avec succès', vehicule: updatedVehicule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Supprimer un véhicule
exports.deleteVehicule = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVehicule = await Vehicule.findByIdAndDelete(id);

    if (!deletedVehicule) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    res.status(200).json({ message: 'Véhicule supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};