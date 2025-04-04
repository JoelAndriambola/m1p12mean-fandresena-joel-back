const PieceDetachee = require("../models/PieceDetachee");

// Créer une nouvelle pièce
exports.createPiece = async (req, res) => {
  try {
    const { nom, quantite, seuil_alerte, prix_unitaire } = req.body;

    // Vérifier si une pièce avec le même nom existe déjà
    const existingPiece = await PieceDetachee.findOne({ nom });
    if (existingPiece) {
      return res.status(400).json({ message: "Une pièce avec ce nom existe déjà." });
    }

    // Créer une nouvelle pièce
    const newPiece = new PieceDetachee({
      nom,
      quantite,
      seuil_alerte,
      prix_unitaire,
    });

    await newPiece.save();
    res.status(201).json({ message: "Pièce créée avec succès", piece: newPiece });
  } catch (error) {
    console.error("Erreur lors de la création de la pièce :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer toutes les pièces
exports.getAllPieces = async (req, res) => {
  try {
    const pieces = await PieceDetachee.find();

    if (!pieces || pieces.length === 0) {
      return res.status(404).json({ message: "Aucune pièce trouvée" });
    }

    res.status(200).json(pieces);
  } catch (error) {
    console.error("Erreur lors de la récupération des pièces :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une pièce par ID
exports.getPieceById = async (req, res) => {
  try {
    const { id } = req.params;

    const piece = await PieceDetachee.findById(id);
    if (!piece) {
      return res.status(404).json({ message: "Pièce non trouvée" });
    }

    res.status(200).json(piece);
  } catch (error) {
    console.error("Erreur lors de la récupération de la pièce :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Mettre à jour une pièce
exports.updatePiece = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, quantite, seuil_alerte, prix_unitaire } = req.body;

    const updatedPiece = await PieceDetachee.findByIdAndUpdate(
      id,
      { nom, quantite, seuil_alerte, prix_unitaire },
      { new: true, runValidators: true } // Retourne la pièce mise à jour
    );

    if (!updatedPiece) {
      return res.status(404).json({ message: "Pièce non trouvée" });
    }

    res.status(200).json({ message: "Pièce mise à jour avec succès", piece: updatedPiece });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la pièce :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer une pièce
exports.deletePiece = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPiece = await PieceDetachee.findByIdAndDelete(id);
    if (!deletedPiece) {
      return res.status(404).json({ message: "Pièce non trouvée" });
    }

    res.status(200).json({ message: "Pièce supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la pièce :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};