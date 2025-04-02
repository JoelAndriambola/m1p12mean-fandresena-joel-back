const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  categorie: {
    type: String,
    enum: ["Diagnostique", "Entretien", "Réparation"],
    required: true,
  },
  prix: { type: Number, required: true },
});

module.exports = mongoose.model("Service", serviceSchema);
