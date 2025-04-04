const mongoose = require("mongoose");

const historiqueUtilisationPiece = new mongoose.Schema({
  piece_id: { type: mongoose.Schema.Types.ObjectId, ref: "PieceDetachee", required: true }, // Référence à la pièce utilisée
  date: { type: Date, required: true, default: Date.now }, // Date de l'action
  quantite: { type: Number, required: true }, // Quantité ajoutée ou utilisée
  commentaire: { type: String, default: "" }, // Optionnel : commentaire sur l'action
  action: { 
    type: String, 
    enum: ["ajout", "utilisation"], // Définir les valeurs possibles pour l'action
    required: true 
  }
});

module.exports = mongoose.model("HistoriqueUtilisationPiece", historiqueUtilisationPiece);