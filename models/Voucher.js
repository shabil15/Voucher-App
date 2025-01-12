const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Voucher = sequelize.define("Voucher", {
  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  generatedDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  qrCode: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Voucher;
