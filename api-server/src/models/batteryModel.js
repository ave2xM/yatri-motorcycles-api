const mongoose = require('mongoose');

const batterySchema = new mongoose.Schema({
  available: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    required: [true, 'Please provide the location'],
  },
});

const Battery = mongoose.model('Battery', batterySchema);

module.exports = Battery;
