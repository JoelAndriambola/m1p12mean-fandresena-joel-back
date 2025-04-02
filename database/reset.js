const mongoose = require("mongoose");
const Service = require("../models/Service");
require("dotenv").config();

async function resetDatabase() {
  try {
    console.log("Resetting database...");

    // Connexion à MongoDB
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
    // Supprime toutes les données des collections
    await Service.deleteMany({});

    console.log("Database reset successfully!");
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    // Déconnexion de MongoDB
    await mongoose.disconnect();
  }
}

resetDatabase();
