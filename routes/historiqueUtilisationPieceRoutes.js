const express = require("express");
const router = express.Router();
const historiqueController = require("../controllers/historiqueUtilisationPieceController");

// Route pour créer une entrée dans l'historique
router.post("/historiques-intervention", historiqueController.createHistorique);
router.get("/historiques-intervention", historiqueController.getAllHistoriques);
router.get("/historiques-interventions/:id", historiqueController.getHistoriqueById);
router.delete("/historiques-intervention/:id", historiqueController.deleteHistorique);

module.exports = router;