const mongoose = require("mongoose");

const interventionSchema = new mongoose.Schema({
  mec_id: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: false }, // ID du mécanicien
  rdv_id: { type: mongoose.Schema.Types.ObjectId, ref: "RendezVous", required: false }, // ID du rendez-vous

  etat: {
    type: String,
    enum: ["Assigné", "En cours", "Terminé"],
    required: true,
  },
  date_debut: { type: Date, required: false },
  date_fin: { type: Date, required: false },

  // select by id service_id puis insert ou update dans intervention avec les nb piece utilisé
  services: [
    {
      service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: false }, // Référence au modèle Service
      pieces_utilisees: [
        {
          piece_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PieceDetachee",
            required: false,
          }, // Référence à une pièce détachée
          quantite_utilisee: { type: Number, required: false }, // Quantité utilisée de cette pièce
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Intervention", interventionSchema);
