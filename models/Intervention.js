const mongoose = require('mongoose');

const interventionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID
  rendez_vous_id: { type: String, required: true, ref: 'RendezVous' },
  mecanicien_id: { type: String, required: true, ref: 'Utilisateur' },
  etat: {
    type: String,
    enum: ['À faire', 'En cours', 'Terminée'],
    default: 'À faire'
  },
  notes: { type: String },
  date_debut: { type: Date },
  date_fin: { type: Date }
});

module.exports = mongoose.model('Intervention', interventionSchema);
