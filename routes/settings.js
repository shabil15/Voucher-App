const express = require("express");
const router = express.Router();

// Settings Page
router.get("/settings", (req, res) => {
  res.render("settings");
});

module.exports = router;
