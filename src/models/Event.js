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

const workshopSchema = new mongoose.Schema(
  {
    event_name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time_start: {
      type: String,
      required: true,
    },
    time_end: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: String,
    dress_code: String,
    contact_person: {
      type: String,
      required: true,
    },
    rsvp_by: {
      type: String,
      required: true,
    },
    contact_website: String,
    registration_link: String
  },
  { timestamps: true }
);

module.exports.Workshop = mongoose.model("Workshop", workshopSchema);
module.exports.Event = mongoose.model("Event", eventSchema);
