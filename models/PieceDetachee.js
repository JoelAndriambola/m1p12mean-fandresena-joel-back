const mongoose = require("mongoose");

const pieceDetacheeSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  quantite: { type: Number, required: true },
  seuil_alerte: { type: Number, required: true },
  prix_unitaire: { type: Number, required: true },
  quantite: { type: Number, default: 0, nullable: true },

});

module.exports = mongoose.model("PieceDetachee", pieceDetacheeSchema);
