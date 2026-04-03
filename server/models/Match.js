const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  type: String,
  matchId: String,
  title: String,
  roomId: String,
  password: String,
  matchTime: String,
  entryFee: Number,
  prizePool: Number,
  totalSlots: Number,
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Match", matchSchema);
