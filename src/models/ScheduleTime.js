const mongoose = require("mongoose");

const scheduleDailyTimeSchema = new mongoose.Schema({
  hour: {
    type: Number,
    required: true,
  },
  minute: {
    type: Number,
    required: true,
  },
});

const scheduleWeekendTimeSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  hour: {
    type: Number,
    required: true,
  },
  minute: {
    type: Number,
    required: true,
  },
});

const ScheduleTime = mongoose.model("ScheduleTime", scheduleDailyTimeSchema);
const ScheduleWeekendTime = mongoose.model(
  "ScheduleWeekendTime",
  scheduleWeekendTimeSchema
);

module.exports = { ScheduleTime, ScheduleWeekendTime };
