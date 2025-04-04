const express = require("express");
const router = express.Router();
const pieceController = require("../controllers/pieceController");

// Route pour pour les pièces détachées
router.post("/pieces", pieceController.createPiece);
router.get("/pieces", pieceController.getAllPieces);
router.get("/pieces/:id", pieceController.getPieceById);
router.put("/pieces/:id", pieceController.updatePiece);
router.delete("/pieces/:id", pieceController.deletePiece);

module.exports = router;