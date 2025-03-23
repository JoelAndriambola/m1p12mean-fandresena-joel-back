const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number
});

module.exports = mongoose.model('Car', carSchema);