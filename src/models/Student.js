const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  subscribed: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Student', studentSchema);