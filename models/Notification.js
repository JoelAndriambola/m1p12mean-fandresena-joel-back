const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID
  utilisateur_id: { type: String, required: true, ref: 'Utilisateur' },
  message: { type: String, required: true },
  date_envoi: { type: Date, required: true, default: Date.now },
  statut: {
    type: String,
    enum: ['Non lu', 'Lu'],
    default: 'Non lu'
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
