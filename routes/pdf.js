const express = require('express');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const { Voucher } = require("../models");
const router = express.Router();

router.get("/generate-pdf/:id", async (req, res) => {
  const voucherId = req.params.id;

  try {
    const voucher = await Voucher.findByPk(voucherId);
    if (!voucher) {
      return res.status(404).send("Voucher not found");
    }

    // Create a new PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 0
    });


    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=voucher-${voucher.code}.pdf`);

    
    doc.pipe(res);

   
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const boxWidth = 400;
    const boxHeight = 600;
    const boxX = (pageWidth - boxWidth) / 2;
    const boxY = 100;

   
    const gradient = doc.linearGradient(boxX, boxY, boxX, boxY + boxHeight);
    gradient.stop(0, '#ffffff')
           .stop(1, '#f0f0f0');

    
    doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 10)
       .fill(gradient);

    
    doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 10)
       .strokeColor('#333333')
       .lineWidth(1)
       .stroke();

    
    doc.font('Helvetica-Bold')
       .fontSize(24)
       .fillColor('#333333')  // Reset text color
       .text('Voucher Code:', boxX, boxY + 40, {
         width: boxWidth,
         align: 'center'
       });

    
    doc.fontSize(22)
       .text(voucher.code, {
         width: boxWidth,
         align: 'center'
       })
       .moveDown(2);

    
    doc.font('Helvetica')
       .fontSize(16)
       .fillColor('#444444');

    const dateText = [
      `Generated: ${new Date(voucher.generatedDate).toLocaleDateString()}`,
      `Valid Until: ${new Date(voucher.expiryDate).toLocaleDateString()}`
    ];

    dateText.forEach(text => {
      doc.text(text, boxX + 50, null, {
        width: boxWidth - 100,
        align: 'center'
      });
    });

    
    const qrCodeDataUrl = await QRCode.toDataURL(voucher.code, {
      width: 200,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    
    const qrSize = 200;
    const qrX = boxX + (boxWidth - qrSize) / 2;
    const qrY = boxY + 250;

    
    doc.image(qrCodeDataUrl, qrX, qrY, {
      width: qrSize,
      height: qrSize
    });

    
    doc.font('Helvetica')
       .fontSize(14)
       .fillColor('#333333')
       .text('Thank you for choosing our service!', boxX, qrY + qrSize + 40, {
         width: boxWidth,
         align: 'center'
       });

    doc.fontSize(12)
       .fillColor('#666666')
       .text('Scan the QR code above to redeem your voucher', {
         width: boxWidth,
         align: 'center'
       });

    
    doc.end();

  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({
      error: 'Failed to generate PDF',
      details: error.message
    });
  }
});

module.exports = router;