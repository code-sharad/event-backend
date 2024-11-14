const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Create a new event
router.post("/", async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const dateObj = new Date(date);
    const event = new Event({ title, description, date: dateObj });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/workshop", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id)
    const res1 = await Event.Workshop.findByIdAndDelete(id);

    res.status(200).json({ message: "Workshop deleted" });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
});

router.get("/workshop", async (req, res) => {
  try {
    const workshops = await Event.Workshop.find({});
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/workshop", async (req, res) => {
  try {
    const {
      event_name,
      date,
      time_start,
      time_end,
      location,
      description,
      dress_code,
      contact_person,
      rsvp_by,
      contact_website,
      registration_link,
    } = req.body;
    const dateObj = new Date(date);
    console.log(req.body);

    const workshop = new Event.Workshop({
      event_name,
      date: dateObj,
      time_start,
      time_end,
      location,
      description,
      dress_code,
      contact_person,
      rsvp_by,
      contact_website,
      registration_link,
    });
    await workshop.save();
    res.status(201).json(workshop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
