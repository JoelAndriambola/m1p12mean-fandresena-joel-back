const mongoose = require('mongoose');

const utilisationPieceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID
  intervention_id: { type: String, required: true, ref: 'Intervention' },
  piece_id: { type: String, required: true, ref: 'PieceDetachee' },
  quantite_utilisee: { type: Number, required: true }
});

module.exports = mongoose.model('UtilisationPiece', utilisationPieceSchema);
