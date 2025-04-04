const express = require('express');
const router = express.Router();
const pieceController = require('../controllers/pieceDetacheeController');

// Routes pour les pièces détachées
router.get('/pieces', pieceController.getAllPieces); // Récupérer toutes les pièces
router.get('/pieces/:id', pieceController.getPieceById); // Récupérer une pièce par ID
router.post('/pieces', pieceController.createPiece); // Créer une nouvelle pièce
router.put('/pieces/:id', pieceController.updatePiece); // Mettre à jour une pièce par ID
router.delete('/pieces/:id', pieceController.deletePiece); // Supprimer une pièce par ID
module.exports = router;