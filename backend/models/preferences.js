const mongoose = require('mongoose');

const PreferencesSchema = new mongoose.Schema({
  blockList: [String]
});

module.exports = mongoose.model('Preferences', PreferencesSchema);