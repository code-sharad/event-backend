const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./dbConnect");
const app = express();
const PORT = process.env.PORT || 3000;
const { startScheduler } = require("./scheduler");

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
dbConnect().catch(() => {
  console.error("MongoDB connection error:", err);
});

export let HOUR = 11;
export let MINUTE = 15;

// Routes
const studentRoutes = require("./routes/studentRoutes");
const eventRoutes = require("./routes/eventRoutes");
const lectureRoutes = require("./routes/lectureRoutes");

app.get("/", (req, res) => {
  res.send("Welcome to the Event Management API");
});

app.get("/api/schedule", (req, res) => {
  const { hour, minute } = req.query;
  if (hour && minute) {
    HOUR = hour;
    MINUTE = minute;
    res.send(`Scheduler started at ${hour}:${minute}`);
  } else {
    res.send(`Scheduler started at ${HOUR}:${MINUTE}`);
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
