const mongoose = require('mongoose');

const pieceDetacheeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID
  nom: { type: String, required: true },
  quantite: { type: Number, required: true },
  seuil_alerte: { type: Number, required: true }
});

module.exports = mongoose.model('PieceDetachee', pieceDetacheeSchema);
