// models/Settings.js
module.exports = (sequelize, DataTypes) => {
    const Settings = sequelize.define('Settings', {
      maxExpiryTime: {
        type: DataTypes.INTEGER,  
        allowNull: false,
        defaultValue: 60, 
      },
      voucherWidth: {
        type: DataTypes.INTEGER,  // in mm
        allowNull: false,
        defaultValue: 100, 
      },
      voucherHeight: {
        type: DataTypes.INTEGER,  // in mm
        allowNull: false,
        defaultValue: 150, 
      },
      titleFontSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 24, 
      },
      textFontSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 16, 
      },
    });
  
    return Settings;
  };
  