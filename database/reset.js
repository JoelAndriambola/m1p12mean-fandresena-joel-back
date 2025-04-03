const mongoose = require("mongoose");
const Role = require("../models/Role");
const Utilisateur = require("../models/Utilisateur");
const Vehicule = require("../models/Vehicule");
const Service = require("../models/Service");
const Intervention = require("../models/Intervention");
const RendezVous = require("../models/RendezVous");
require("dotenv").config();

async function resetDatabase() {
  try {
    console.log("Resetting database...");

    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Suppression des données des collections
    await Role.deleteMany({});
    console.log("Collection Role réinitialisée");

    await Utilisateur.deleteMany({});
    console.log("Collection Utilisateur réinitialisée");

    await Vehicule.deleteMany({});
    console.log("Collection Vehicule réinitialisée");

    await Service.deleteMany({});
    console.log("Collection Service réinitialisée");

    await Intervention.deleteMany({});
    console.log("Collection Intervention réinitialisée");

    await RendezVous.deleteMany({});
    console.log("Collection RendezVous réinitialisée");

    console.log("Database reset successfully!");
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    // Déconnexion de MongoDB
    await mongoose.disconnect();
  }
}

resetDatabase();
