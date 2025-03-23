const mongoose = require('mongoose');

const avisClientSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID
  client_id: { type: String, required: true, ref: 'Utilisateur' },
  service_id: { type: String, required: true, ref: 'Service' },
  note: { type: Number, required: true },
  commentaire: { type: String },
  date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('AvisClient', avisClientSchema);
