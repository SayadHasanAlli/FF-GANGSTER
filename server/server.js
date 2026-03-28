require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

/* =========================
   TEAM SCHEMA
========================= */
const teamSchema = new mongoose.Schema({
  team: String,
  players: [String],
  wpnum: String,
  upi: String,
  utr: String,
  payer: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Team = mongoose.model("Team", teamSchema);

/* =========================
   SOLO SCHEMA (NEW)
========================= */
const soloSchema = new mongoose.Schema({
  players: [String],
  wpnum: String,
  upi: String,
  utr: String,
  payer: String,
  refer: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Solo = mongoose.model("Solo", soloSchema);

/* =========================
   TEAM ROUTES
========================= */

// 📌 Register Team
app.post("/register", async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();

    res.json({ msg: "Registered Successfully", success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get Teams
app.get("/teams", async (req, res) => {
  const teams = await Team.find().sort({ createdAt: -1 });
  res.json(teams);
});

// 📌 Approve Team
app.put("/approve/:id", async (req, res) => {
  await Team.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ msg: "Approved" });
});

// 📌 Delete Team
app.delete("/delete/:id", async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

/* =========================
   SOLO ROUTES (NEW)
========================= */

// 📌 Register SOLO
app.post("/register_solo", async (req, res) => {
  try {
    const solo = new Solo(req.body);
    await solo.save();

    res.json({
      success: true,
      msg: "Solo Registered Successfully ✅",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get Solo Players
app.get("/solo", async (req, res) => {
  const data = await Solo.find().sort({ createdAt: -1 });
  res.json(data);
});

// 📌 Approve Solo
app.put("/solo/approve/:id", async (req, res) => {
  await Solo.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ msg: "Solo Approved ✅" });
});

// 📌 Delete Solo
app.delete("/solo/delete/:id", async (req, res) => {
  await Solo.findByIdAndDelete(req.params.id);
  res.json({ msg: "Solo Deleted ❌" });
});

/* ========================= */

app.listen(process.env.PORT || 5000, () => console.log("Server running 🚀"));
