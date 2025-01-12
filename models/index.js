const sequelize = require("../config/database");
const Voucher = require("./Voucher");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL successfully.");
    await sequelize.sync({ alter: true }); 
    console.log("Database synced.");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

module.exports = { Voucher };
