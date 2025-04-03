const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: { type: String, required: true }, // Le nom du rôle (ex: manager ou Mécanicien ou Client)
});

module.exports = mongoose.model("Role", roleSchema);
