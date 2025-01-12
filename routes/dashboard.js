const express = require("express");
const QRCode = require("qrcode");
const { Voucher } = require("../models");
const router = express.Router();

// Dashboard
router.get("/dashboard", async (req, res) => {
//   if (!req.session.loggedIn) return res.redirect("/");
  const vouchers = await Voucher.findAll();
  res.render("dashboard", { vouchers });
});

// Generate QR Code
router.post("/generate", async (req, res) => {
  const code = Math.random().toString().slice(2, 12); // 10-digit random number
  const qrCode = await QRCode.toDataURL(code);
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7); // 7 days expiry

  await Voucher.create({
    code,
    generatedDate: new Date(),
    expiryDate,
    qrCode,
  });

  res.redirect("/dashboard");
});

module.exports = router;
