const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  name: String,
  date: String,
  checkIn: String,
  checkOut: String
});

module.exports = mongoose.model("Attendance", attendanceSchema);
