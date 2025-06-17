const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  hostname: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', LogSchema);