const mongoose = require('mongoose');

const vehiculeSchema = new mongoose.Schema({
  marque: { type: String, required: true },
  modele: { type: String, required: true },
  annee: { type: Number, required: true },
  plaque_immatriculation: { type: String, required: true, unique: true },
  utilisateur_id: { type: String, required: true, ref: 'Utilisateur' }
});

module.exports = mongoose.model('Vehicule', vehiculeSchema);
