const HistoriqueUtilisationPiece = require("../models/HistoriqueUtilisationPiece");
const PieceDetachee = require("../models/PieceDetachee");

// Créer une nouvelle entrée dans l'historique
exports.createHistorique = async (req, res) => {
  try {
    const { piece_id, quantite, commentaire, action, date } = req.body;

    // Vérifier si la pièce existe
    const piece = await PieceDetachee.findById(piece_id);
    if (!piece) {
      return res.status(404).json({ message: "Pièce détachée non trouvée" });
    }

    // Mettre à jour la quantité dans la pièce en fonction de l'action
    if (action === "ajout") {
      piece.quantite += quantite; // Ajouter la quantité
    } else if (action === "utilisation") {
      if (piece.quantite < quantite) {
        return res.status(400).json({ message: "Quantité insuffisante en stock" });
      }
      piece.quantite -= quantite; // Soustraire la quantité
    } else {
      return res.status(400).json({ message: "Action invalide. Utilisez 'ajout' ou 'utilisation'." });
    }

    // Sauvegarder les modifications dans la pièce
    await piece.save();

    // Créer une nouvelle entrée dans l'historique
    const historique = new HistoriqueUtilisationPiece({
      piece_id,
      quantite,
      commentaire,
      action,
      date: date || Date.now(), // Utiliser la date fournie ou la date actuelle par défaut
    });

    await historique.save();

    res.status(201).json({ message: "Historique créé avec succès", historique });
  } catch (error) {
    console.error("Erreur lors de la création de l'historique :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer toutes les entrées de l'historique
exports.getAllHistoriques = async (req, res) => {
  try {
    const historiques = await HistoriqueUtilisationPiece.find().populate("piece_id", "nom quantite");

    if (!historiques || historiques.length === 0) {
      return res.status(404).json({ message: "Aucun historique trouvé" });
    }

    res.status(200).json(historiques);
  } catch (error) {
    console.error("Erreur lors de la récupération des historiques :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une entrée de l'historique par ID
exports.getHistoriqueById = async (req, res) => {
  try {
    const { id } = req.params;

    const historique = await HistoriqueUtilisationPiece.findById(id).populate("piece_id", "nom quantite");
    if (!historique) {
      return res.status(404).json({ message: "Historique non trouvé" });
    }

    res.status(200).json(historique);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer une entrée de l'historique
exports.deleteHistorique = async (req, res) => {
  try {
    const { id } = req.params;

    const historique = await HistoriqueUtilisationPiece.findByIdAndDelete(id);
    if (!historique) {
      return res.status(404).json({ message: "Historique non trouvé" });
    }

    res.status(200).json({ message: "Historique supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'historique :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};