const mongoose = require("mongoose");

const rendezVousSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Utilisateur",
  },
  services: [
    {
      service_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Service",
      },
    },
  ],
  date_heure: { type: Date, required: true },
  statut: {
    type: String,
    enum: ["En attente", "Confirmé", "Annulé"],
    default: "En attente",
  },
});

module.exports = mongoose.model("RendezVous", rendezVousSchema);
