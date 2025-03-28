const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID
  client_id: { type: String, required: true, ref: 'Utilisateur' },
  vehicule_id: { type: String, required: true, ref: 'Vehicule' },
  type_intervention: { type: String, required: true },
  date_heure: { type: Date, required: true },
  statut: {
    type: String,
    enum: ['En attente', 'Confirmé', 'Annulé'],
    default: 'En attente'
  }
});

module.exports = mongoose.model('RendezVous', rendezVousSchema);
