const mongoose = require('mongoose');

const interventionServiceSchema = new mongoose.Schema({
  intervention_id: { type: String, required: true, ref: 'Intervention' },
  service_id: { type: String, required: true, ref: 'Service' }
}, { _id: false }); // Composite key => pas besoin d'_id généré par Mongoose

interventionServiceSchema.index({ intervention_id: 1, service_id: 1 }, { unique: true });

module.exports = mongoose.model('InterventionService', interventionServiceSchema);
