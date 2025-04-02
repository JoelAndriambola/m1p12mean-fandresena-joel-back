const mongoose = require("mongoose");

const utilisateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  telephone: { type: String },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }, // Référence au modèle Role
  vehicule_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicule" }], // Référence au modèle Vehicule
});

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
