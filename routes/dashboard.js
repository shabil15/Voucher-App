const express = require("express");
const QRCode = require("qrcode");
const { Voucher } = require("../models");
const router = express.Router();

// Dashboard
router.get("/dashboard/", async (req, res) => {
    // if (!req.session.loggedIn) return res.redirect("/");
    const vouchers = await Voucher.findAll({
      order: [['generatedDate', 'DESC']] 
    });
    res.render("dashboard", { vouchers });
  });
  
// QR Code
router.post("/generate", async (req, res) => {
  const code = Math.random().toString().slice(2, 12); 
  const qrCode = await QRCode.toDataURL(code);
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7); 

  await Voucher.create({
    code,
    generatedDate: new Date(),
    expiryDate,
    qrCode,
  });

  res.redirect("/dashboard?success=true");
});

module.exports = router;
