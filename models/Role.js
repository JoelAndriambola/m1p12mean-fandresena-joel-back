const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID
  role: { type: String, required: true }
});

module.exports = mongoose.model('Role', roleSchema);
