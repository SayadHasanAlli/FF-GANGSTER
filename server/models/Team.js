const mongoose = require("mongoose");

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

module.exports = mongoose.model("Team", teamSchema);
