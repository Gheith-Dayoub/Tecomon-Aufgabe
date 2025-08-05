const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latlng: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Weather', searchSchema);
