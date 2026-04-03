const mongoose = require("mongoose");

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

module.exports = mongoose.model("Solo", soloSchema);
