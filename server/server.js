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

// Schema
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

// 📌 Register
app.post("/register", async (req, res) => {
  try {
    // console.log("DATA RECEIVED 👉", req.body); // debug

    const team = new Team(req.body);
    await team.save();

    res.json({ msg: "Registered Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get Teams
app.get("/teams", async (req, res) => {
  const teams = await Team.find().sort({ createdAt: -1 });
  res.json(teams);
});

// 📌 Approve
app.put("/approve/:id", async (req, res) => {
  await Team.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ msg: "Approved" });
});

// 📌 Delete
app.delete("/delete/:id", async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

app.listen(process.env.PORT || 5000, () => console.log("Server running 🚀"));
