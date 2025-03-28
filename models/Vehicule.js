const mongoose = require('mongoose');

const vehiculeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID
  utilisateur_id: { type: String, required: true, ref: 'Utilisateur' },
  marque: { type: String, required: true },
  modele: { type: String, required: true },
  annee: { type: Number, required: true },
  plaque_immatriculation: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Vehicule', vehiculeSchema);
