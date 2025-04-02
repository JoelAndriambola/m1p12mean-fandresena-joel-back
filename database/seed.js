const mongoose = require("mongoose");
const Service = require("../models/Service"); // Importez votre modèle Service
require("dotenv").config();

async function seedDatabase() {
  try {
    console.log("Seeding database...");

    // Connexion à MongoDB
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));

    // Ajout de services
    await Service.insertMany([
      {
        nom: "Changement d'huile",
        categorie: "Entretien",
        tarif: 50,
        duree_estimee: 30,
      },
      {
        nom: "Diagnostic moteur",
        categorie: "Diagnostique",
        tarif: 100,
        duree_estimee: 60,
      },
      {
        nom: "Réparation de freins",
        categorie: "Réparation",
        tarif: 200,
        duree_estimee: 120,
      },
    ]);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Déconnexion de MongoDB
    await mongoose.disconnect();
  }
}

seedDatabase();
