const express = require("express");
const router = express.Router();
const rendezVousController = require("../controllers/rendezVousController");

// Routes pour les rendez-vous
router.get("/rendezvous", rendezVousController.getAllRendezVous); // Récupérer tous les rendez-vous
router.get("/rendezvous/:id", rendezVousController.getRendezVousById); // Récupérer un rendez-vous par ID
router.post("/rendezvous", rendezVousController.createRendezVous); // Créer un nouveau rendez-vous
router.put("/rendezvous/:id", rendezVousController.updateRendezVous); // Mettre à jour un rendez-vous par ID
router.delete("/rendezvous/:id", rendezVousController.deleteRendezVous); // Supprimer un rendez-vous par ID

module.exports = router;
