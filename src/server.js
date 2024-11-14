const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./dbConnect");
const app = express();
const PORT = process.env.PORT || 3000;
const { startScheduler, stopScheduler, setTime } = require("./scheduler");

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
dbConnect().catch(() => {
  console.error("MongoDB connection error:", err);
});

let HOUR = 11;
let MINUTE = 15;

// Routes
const studentRoutes = require("./routes/studentRoutes");
const eventRoutes = require("./routes/eventRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const { ScheduleTime } = require("./models/ScheduleTime");
const { sendWhatsAppMessage } = require("./services/whatsappService");
const Student = require("./models/Student");
const { Event } = require("./models/Event");
const { Workshop } = require("./models/Event");

app.get("/", (req, res) => {
  res.send("Welcome to the Event Management API");
});

app.get("/api/admin/schedule", async (req, res) => {
  const { hour, minute } = req.query;
  try {
    if (hour && minute) {
      HOUR = Number(hour);
      MINUTE = Number(minute);
      await ScheduleTime.deleteMany({});
      const data = await ScheduleTime.create({ hour: HOUR, minute: MINUTE });
      await data.save();
      const getData = await ScheduleTime.findOne();
      setTime(getData);
      stopScheduler();
      startScheduler();
      res.send(`Scheduler started at ${hour}:${minute}, `);
    } else {
      res.send(`Scheduler started at ${HOUR}:${MINUTE}`);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// send message

app.post("/api/send-message", async (req, res) => {
  try {
    const { id } = req.body;
    const students = await Student.find({ subscribed: true });

    const message = await Workshop.findById(id);
    for (const student of students) {
      await sendWhatsAppMessage(student.phoneNumber, message);
    }
    res.send("Message sent successfully");
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});
app.use("/api/students", studentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/lectures", lectureRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  startScheduler();
});
