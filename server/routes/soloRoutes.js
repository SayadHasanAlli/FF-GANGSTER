const express = require("express");
const router = express.Router();
const Solo = require("../models/Solo");

router.post("/register_solo", async (req, res) => {
  const solo = new Solo(req.body);
  await solo.save();
  res.json({ success: true });
});

router.get("/solo", async (req, res) => {
  const data = await Solo.find().sort({ createdAt: -1 });
  res.json(data);
});

router.put("/solo/approve/:id", async (req, res) => {
  await Solo.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ msg: "Approved" });
});

router.delete("/solo/delete/:id", async (req, res) => {
  await Solo.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
