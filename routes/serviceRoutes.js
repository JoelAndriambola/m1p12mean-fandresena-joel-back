const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// Routes pour les services
router.get("/services", serviceController.getAllServices); // Récupérer tous les services
router.get("/services/:id", serviceController.getServiceById); // Récupérer un service par ID
router.post("/services", serviceController.createService); // Créer un nouveau service
router.put("/services/:id", serviceController.updateService); // Mettre à jour un service par ID
router.delete("/services/:id", serviceController.deleteService); // Supprimer un service par ID

module.exports = router;
