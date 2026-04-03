const express = require("express");
const router = express.Router();
const Match = require("../models/Match");

router.get("/match/solo", async (req, res) => {
  const data = await Match.findOne({ type: "solo", isActive: true });
  res.json(data);
});

router.get("/match/team", async (req, res) => {
  const data = await Match.findOne({ type: "team", isActive: true });
  res.json(data);
});

module.exports = router;
