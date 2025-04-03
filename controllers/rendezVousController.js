const RendezVous = require("../models/RendezVous");

// Récupérer tous les rendez-vous
exports.getAllRendezVous = async (req, res) => {
  try {
    const rendezVous = await RendezVous.find()
      .populate("client_id")
      .populate("services.service_id");
    res.status(200).json(rendezVous);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des rendez-vous",
      error,
    });
  }
};

// Récupérer un rendez-vous par ID
exports.getRendezVousById = async (req, res) => {
  try {
    const rendezVous = await RendezVous.findById(req.params.id)
      .populate("client_id")
      .populate("services.service_id");
    if (!rendezVous) {
      return res.status(404).json({ message: "Rendez-vous non trouvé" });
    }
    res.status(200).json(rendezVous);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du rendez-vous",
      error,
    });
  }
};

// Créer un nouveau rendez-vous
exports.createRendezVous = async (req, res) => {
  try {
    const newRendezVous = new RendezVous(req.body);
    const savedRendezVous = await newRendezVous.save();
    res.status(201).json(savedRendezVous);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création du rendez-vous", error });
  }
};

// Mettre à jour un rendez-vous par ID
exports.updateRendezVous = async (req, res) => {
  try {
    const updatedRendezVous = await RendezVous.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRendezVous) {
      return res.status(404).json({ message: "Rendez-vous non trouvé" });
    }
    res.status(200).json(updatedRendezVous);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour du rendez-vous", error });
  }
};

// Supprimer un rendez-vous par ID
exports.deleteRendezVous = async (req, res) => {
  try {
    const deletedRendezVous = await RendezVous.findByIdAndDelete(req.params.id);
    if (!deletedRendezVous) {
      return res.status(404).json({ message: "Rendez-vous non trouvé" });
    }
    res.status(200).json({ message: "Rendez-vous supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du rendez-vous", error });
  }
};
