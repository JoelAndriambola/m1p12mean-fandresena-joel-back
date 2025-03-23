const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  telephone: { type: String },
  role_id: { type: Number } // ou String si UUID (selon tes données)
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
