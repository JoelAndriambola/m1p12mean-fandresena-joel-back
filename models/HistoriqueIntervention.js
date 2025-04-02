const mongoose = require("mongoose");

const interventionSchema = new mongoose.Schema({
  mec_id: { type: String, required: true }, // Mécanicien responsable
  etat: {
    type: String,
    enum: ["Assigné", "En cours", "Terminé"],
    required: true,
  },
  date_debut: { type: Date, required: true },
  date_fin: { type: Date, required: true },
  type_intervention: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
});

module.exports = mongoose.model("HistoriqueIntervention", interventionSchema);
