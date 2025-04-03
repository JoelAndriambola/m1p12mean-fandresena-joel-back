const PieceDetachee = require('../models/PieceDetachee');

// Récupérer toutes les pièces détachées
exports.getAllPieces = async (req, res) => {
  try {
    const pieces = await PieceDetachee.find();
    res.status(200).json(pieces);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des pièces détachées", error });
  }
};

// Récupérer une pièce détachée par ID
exports.getPieceById = async (req, res) => {
  try {
    const piece = await PieceDetachee.findById(req.params.id);
    if (!piece) {
      return res.status(404).json({ message: "Pièce détachée non trouvée" });
    }
    res.status(200).json(piece);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la pièce détachée", error });
  }
};

// Créer une nouvelle pièce détachée
exports.createPiece = async (req, res) => {
  const { nom, quantite, seuil_alerte, prix_unitaire } = req.body;

  const piece = new PieceDetachee({
    nom,
    quantite,
    seuil_alerte,
    prix_unitaire,
  });

  try {
    const newPiece = await piece.save();
    res.status(201).json({ message: "Pièce détachée créée avec succès", piece: newPiece });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de la pièce détachée", error });
  }
};

// Mettre à jour une pièce détachée par ID
exports.updatePiece = async (req, res) => {
  try {
    const updatedPiece = await PieceDetachee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPiece) {
      return res.status(404).json({ message: "Pièce détachée non trouvée" });
    }
    res.status(200).json({ message: "Pièce détachée mise à jour avec succès", piece: updatedPiece });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de la pièce détachée", error });
  }
};

// Supprimer une pièce détachée par ID
exports.deletePiece = async (req, res) => {
  try {
    const deletedPiece = await PieceDetachee.findByIdAndDelete(req.params.id);
    if (!deletedPiece) {
      return res.status(404).json({ message: "Pièce détachée non trouvée" });
    }
    res.status(200).json({ message: "Pièce détachée supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la pièce détachée", error });
  }
};