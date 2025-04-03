const mongoose = require("mongoose");

const historiqueInterventionSchema = new mongoose.Schema({
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
  services: [
    {
      service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" }, // Référence au modèle Service
      pieces_utilisees: [
        {
          piece_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PieceDetachee",
            required: false, // Nullable
          }, // Référence à une pièce détachée
          quantite_utilisee: { type: Number, required: false }, // Nullable
        },
      ],
    },
  ],
});

module.exports = mongoose.model(
  "HistoriqueIntervention",
  historiqueInterventionSchema
);
