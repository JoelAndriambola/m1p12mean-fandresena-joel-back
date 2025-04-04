const HistoriqueIntervention = require("../models/HistoriqueIntervention");
const Intervention = require("../models/Intervention");
const RendezVous = require("../models/RendezVous");

// Récupérer toutes les interventions
exports.getAllInterventions = async (req, res) => {
  try {
    const interventions = await Intervention.find().populate(
      "type_intervention"
    );
    res.status(200).json(interventions);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des interventions",
      error,
    });
  }
};

// Récupérer une intervention par ID
exports.getInterventionById = async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id).populate(
      "type_intervention"
    );
    if (!intervention) {
      return res.status(404).json({ message: "Intervention non trouvée" });
    }
    res.status(200).json(intervention);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'intervention",
      error,
    });
  }
};

// Initialiser dans la parti" front les etats des service puis envoyer dans le back toutes les donnés
exports.createIntervention = async (req, res) => {
  try {
    // Mettre à jour le statut du rendez-vous en "Confirmé" avant de créer l'intervention
    if (req.body.rdv_id) {
      const updatedRendezVous = await RendezVous.findByIdAndUpdate(
        req.body.rdv_id,
        { statut: "Confirmé" },
        { new: true }
      );

      if (!updatedRendezVous) {Intervention
        return res.status(404).json({ message: "Rendez-vous non trouvé" });
      }
    }

    // Créer une nouvelle intervention
    const newIntervention = new Intervention(req.body);
    const savedIntervention = await newIntervention.save();

    // Ajouter l'intervention dans l'historique
    const historique = new HistoriqueIntervention(savedIntervention.toObject());
    await historique.save();

    res.status(201).json(savedIntervention);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création de l'intervention", error });
  }
};

// Mettre à jour une intervention par ID
exports.updateIntervention = async (req, res) => {
  try {
    const updatedIntervention = await Intervention.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedIntervention) {
      return res.status(404).json({ message: "Intervention non trouvée" });
    }
    res.status(200).json(updatedIntervention);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour de l'intervention",
      error,
    });
  }
};

// Supprimer une intervention par ID
exports.deleteIntervention = async (req, res) => {
  try {
    const deletedIntervention = await Intervention.findByIdAndDelete(
      req.params.id
    );
    if (!deletedIntervention) {
      return res.status(404).json({ message: "Intervention non trouvée" });
    }
    res.status(200).json({ message: "Intervention supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'intervention",
      error,
    });
  }
};
