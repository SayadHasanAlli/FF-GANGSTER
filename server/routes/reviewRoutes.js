const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// ================= ADD REVIEW =================
router.post("/add-review", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    res.json({ success: true, msg: "Review submitted" });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ success: false, msg: "Duplicate review" });
    }
    res.status(500).json({ error: err.message });
  }
});

// ================= GET PUBLIC REVIEWS (TOP 8) =================
router.get("/reviews", async (req, res) => {
  const reviews = await Review.find({ approved: true })
    .sort({ createdAt: -1 })
    .limit(8);

  res.json(reviews);
});

// ================= GET ALL REVIEWS (ADMIN) =================
router.get("/reviews-all", async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });

  res.json(reviews);
});

// ================= APPROVE REVIEW =================
router.put("/review/approve/:id", async (req, res) => {
  await Review.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ success: true });
});

// ================= DELETE REVIEW =================
router.delete("/review/delete/:id", async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
