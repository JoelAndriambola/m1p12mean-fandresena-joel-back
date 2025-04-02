const mongoose = require("mongoose");
const Role = require("../models/Role");
const Utilisateur = require("../models/Utilisateur");
const Vehicule = require("../models/Vehicule");
const Service = require("../models/Service");
const Intervention = require("../models/Intervention");
require("dotenv").config();

async function seedDatabase() {
  try {
    console.log("Seeding database...");

    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Ajout des rôles
    const roles = await Role.insertMany([
      { role: "Manager" },
      { role: "Mécanicien" },
      { role: "Client" },
    ]);
    console.log("Rôles ajoutés :", roles);

    // Ajout des utilisateurs
    const utilisateurs = await Utilisateur.insertMany([
      {
        nom: "Dupont",
        prenom: "Jean",
        email: "jean.dupont@example.com",
        mot_de_passe: "password123", // À hasher dans une vraie application
        telephone: "0601020304",
        role_id: roles[2]._id, // Client
      },
      {
        nom: "Martin",
        prenom: "Paul",
        email: "paul.martin@example.com",
        mot_de_passe: "password123", // À hasher dans une vraie application
        telephone: "0605060708",
        role_id: roles[1]._id, // Mécanicien
      },
      {
        nom: "Durand",
        prenom: "Sophie",
        email: "sophie.durand@example.com",
        mot_de_passe: "password123", // À hasher dans une vraie application
        telephone: "0611121314",
        role_id: roles[0]._id, // manager
      },
      {
        nom: "Lemoine",
        prenom: "Claire",
        email: "claire.lemoine@example.com",
        mot_de_passe: "password123", // À hasher dans une vraie application
        telephone: "0614151617",
        role_id: roles[2]._id, // Client
      },
      {
        nom: "Bernard",
        prenom: "Luc",
        email: "luc.bernard@example.com",
        mot_de_passe: "password123", // À hasher dans une vraie application
        telephone: "0617181920",
        role_id: roles[1]._id, // Mécanicien
      },
    ]);
    console.log("Utilisateurs ajoutés :", utilisateurs);

    // Ajout des véhicules
    const vehicules = await Vehicule.insertMany([
      {
        marque: "Toyota",
        modele: "Corolla",
        annee: 2015,
        plaque_immatriculation: "AB-123-CD",
      },
      {
        marque: "Honda",
        modele: "Civic",
        annee: 2018,
        plaque_immatriculation: "EF-456-GH",
      },
    ]);
    console.log("Véhicules ajoutés :", vehicules);

    // Mise à jour des utilisateurs avec leurs véhicules
    await Utilisateur.findByIdAndUpdate(utilisateurs[0]._id, {
      vehicule_id: [vehicules[0]._id, vehicules[1]._id],
    });

    // Ajout des services
    const services = await Service.insertMany([
      {
        nom: "Changement d'huile",
        categorie: "Entretien",
        prix: 50,
      },
      {
        nom: "Réparation de freins",
        categorie: "Réparation",
        prix: 200,
      },
      {
        nom: "Diagnostic moteur",
        categorie: "Diagnostique",
        prix: 100,
      },
    ]);
    console.log("Services ajoutés :", services);

    // Ajout des interventions

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Déconnexion de MongoDB
    await mongoose.disconnect();
  }
}

seedDatabase();
