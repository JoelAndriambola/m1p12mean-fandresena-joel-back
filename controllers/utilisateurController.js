const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Pour charger les variables d'environnement (comme la clé secrète)


// Register a new user
exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, telephone } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Create a new user
    const newUser = new Utilisateur({
      id: uuidv4(),
      nom,
      prenom,
      email,
      mot_de_passe: hashedPassword,
      telephone,
      role_id: 1 // Client par défaut
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await Utilisateur.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le mot de passe est correct
    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role_id: user.role_id },
      process.env.JWT_SECRET, // Clé secrète pour signer le token
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Durée d'expiration du token (1 heure par défaut)
    );

    // Réponse avec le token
    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role_id: user.role_id
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};



// Fonction pour récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
      // Récupère tous les utilisateurs de la base de données
      const utilisateurs = await Utilisateur.find();  // Utilisation du modèle Utilisateur
  
      // Si aucun utilisateur trouvé
      if (!utilisateurs || utilisateurs.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
      }
  
      // Renvoie les utilisateurs en réponse
      res.status(200).json(utilisateurs);
    } catch (error) {
      // Gestion des erreurs
      res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};