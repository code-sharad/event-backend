const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  professor: String,
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Lecture', lectureSchema);