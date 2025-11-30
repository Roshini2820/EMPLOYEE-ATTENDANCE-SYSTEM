const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Attendance = require("./Attendance");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/simpleAttendance");

// Check-in
app.post("/checkin", async (req, res) => {
  const today = new Date().toLocaleDateString();
  const record = await Attendance.findOne({ name: req.body.name, date: today });

  if (record) return res.json({ message: "Already checked in" });

  const data = await Attendance.create({
    name: req.body.name,
    date: today,
    checkIn: new Date().toLocaleTimeString()
  });

  res.json(data);
});

// Check-out
app.post("/checkout", async (req, res) => {
  const today = new Date().toLocaleDateString();
  const record = await Attendance.findOne({ name: req.body.name, date: today });

  if (!record) return res.json({ message: "Check-in first" });

  record.checkOut = new Date().toLocaleTimeString();
  await record.save();

  res.json(record);
});

// History
app.get("/history/:name", async (req, res) => {
  const data = await Attendance.find({ name: req.params.name });
  res.json(data);
});

app.listen(5000, () => console.log("Server running on 5000"));
