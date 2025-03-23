const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Register un nouvel utilisateur
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

    // Créer un nouvel utilisateur
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