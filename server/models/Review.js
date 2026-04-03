const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  message: String,
  rating: Number,
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// جلوگیری duplicate
reviewSchema.index({ name: 1, message: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
