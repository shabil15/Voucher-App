// routes/settings.js
const express = require('express');
const { Settings } = require('../models');
const router = express.Router();

// Get settings
router.get('/settings/:id', async (req, res) => {
  
    // const settings = await Settings.findOne(id);
    // if (!settings) {
    //   return res.status(404).send('Settings not found');
    // }
    res.render('settings');
    
});

// Update settings
router.post('/settings', async (req, res) => {
  const { maxExpiryTime, voucherWidth, voucherHeight, titleFontSize, textFontSize } = req.body;
  
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).send('Settings not found');
    }

    settings.maxExpiryTime = maxExpiryTime || settings.maxExpiryTime;
    settings.voucherWidth = voucherWidth || settings.voucherWidth;
    settings.voucherHeight = voucherHeight || settings.voucherHeight;
    settings.titleFontSize = titleFontSize || settings.titleFontSize;
    settings.textFontSize = textFontSize || settings.textFontSize;

    await settings.save();
    res.redirect('/settings');
  } catch (error) {
    res.status(500).send('Error updating settings');
  }
});

module.exports = router;
