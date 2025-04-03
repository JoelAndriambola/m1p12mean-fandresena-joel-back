const mongoose = require("mongoose");

const interventionSchema = new mongoose.Schema({
  mec_id: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur" }, // ID du mécanicien
  rdv_id: { type: mongoose.Schema.Types.ObjectId, ref: "RendezVous" }, // ID du rendez-vous

  etat: {
    type: String,
    enum: ["Assigné", "En cours", "Terminé"],
    required: true,
  },
  date_debut: { type: Date, required: true },
  date_fin: { type: Date, required: true },

  // Tableau des services avec les pièces utilisées
  // select by id service_id puis insert ou update dans intervention avec les nb piece utilisé
  services: [
    {
      service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" }, // Référence au modèle Service
      pieces_utilisees: [
        {
          piece_id: { type: mongoose.Schema.Types.ObjectId, ref: "PieceDetachee" }, // Référence à une pièce détachée
          quantite_utilisee: { type: Number, required: true }, // Quantité utilisée de cette pièce
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Intervention", interventionSchema);