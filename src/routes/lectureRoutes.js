const express = require('express');
const router = express.Router();
const Lecture = require('../models/Lecture');

// Create a new lecture
router.post('/', async (req, res) => {
  try {
    const { subject, professor, date, startTime, endTime } = req.body;
    // input as 27/9/2024 string convert to Date format 
    const dateObj = new Date(date);
    const lecture = new Lecture({
      subject,
      professor,
      date: dateObj,
      startTime,
      endTime,
    });
    await lecture.save();
    res.status(201).json(lecture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all lectures
router.get('/', async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;