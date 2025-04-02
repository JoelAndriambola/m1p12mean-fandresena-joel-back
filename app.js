const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Charger les variables d'environnement
dotenv.config();

// Initialisation de l'apllication
const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Import des routes
const utilisateurRoutes = require("./routes/utilisateurRoutes");
const vehiculeRoutes = require("./routes/vehiculeRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const interventionRoutes = require("./routes/interventionRoutes");

// Définition des points de montage des routes
app.use("/api", interventionRoutes);
app.use("/api", utilisateurRoutes);
app.use("/api", vehiculeRoutes);
app.use("/api", serviceRoutes);

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;
