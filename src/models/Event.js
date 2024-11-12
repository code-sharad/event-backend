const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    eventType: {
      type: String,
      enum: ["lecture", "event", "exam", "other"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
