const express = require("express");
const router = express.Router();
const interventionController = require("../controllers/interventionController");

// Routes pour les interventions
router.get("/interventions", interventionController.getAllInterventions); // Récupérer toutes les interventions
router.get("/interventions/:id", interventionController.getInterventionById); // Récupérer une intervention par ID
router.post("/interventions", interventionController.createIntervention); // Créer une nouvelle intervention
router.put("/interventions/:id", interventionController.updateIntervention); // Mettre à jour une intervention par ID
router.delete("/interventions/:id", interventionController.deleteIntervention); // Supprimer une intervention par ID

module.exports = router;
