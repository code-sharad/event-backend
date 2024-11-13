const cron = require("node-cron");
const Student = require("./models/Student");
const Event = require("./models/Event");
const Lecture = require("./models/Lecture");
const { sendWhatsAppMessage } = require("./services/whatsappService");
const { MINUTE, HOUR } = require("./server");

// Weekly event update (every Sunday at 9:00 AM)
const weeklyEventUpdate = cron.schedule(
  "0 9 * * 0",
  async () => {
    try {
      const students = await Student.find({ subscribed: true });
      const events = await Event.find({ date: { $gte: new Date() } })
        .sort("date")
        .limit(5);

      const message = `Upcoming events:\n${events
        .map((event) => `${event.title} - ${event.date.toDateString()}`)
        .join("\n")}`;

      for (const student of students) {
        await sendWhatsAppMessage();
      }
      console.log("Weekly event update sent successfully");
    } catch (error) {
      console.error("Error sending weekly event update:", error);
    }
  },
  {
    scheduled: false,
  }
);


// Daily lecture reminder (every day at 8:00 AM)
const dailyLectureReminder = cron.schedule(
  `${MINUTE} ${HOUR} * * *`,
  async () => {
    console.log("Running a task every day at 8 AM");

    try {
      const students = await Student.find({ subscribed: true });
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate());
      console.log(tomorrow);
      const lectures = await Lecture.find({
        date: {
          $gte: tomorrow,
          $lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000),
        },
      }).sort("startTime");
      console.log(lectures);
      const message = `Tomorrow's lectures:\n${lectures
        .map(
          (lecture) =>
            `${lecture.subject} - ${lecture.startTime} to ${lecture.endTime}`
        )
        .join("\n")}`;

      for (const student of students) {
        await sendWhatsAppMessage(student.phoneNumber);
      }
      console.log("Daily lecture reminder sent successfully");
    } catch (error) {
      console.error("Error sending daily lecture reminder:", error);
    }
  },
  {
    scheduled: false,
    timezone: "Asia/Kolkata",
  }
);

// Start the scheduler
function startScheduler() {
  weeklyEventUpdate.start();
  dailyLectureReminder.start();
  console.log("Scheduler started");
}

module.exports = { startScheduler };
