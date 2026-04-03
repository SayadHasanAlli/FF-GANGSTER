const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// Register
router.post("/register", async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.json({ success: true });
});

// Get
router.get("/teams", async (req, res) => {
  const teams = await Team.find().sort({ createdAt: -1 });
  res.json(teams);
});

// Approve
router.put("/approve/:id", async (req, res) => {
  await Team.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ msg: "Approved" });
});

// Delete
router.delete("/delete/:id", async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
