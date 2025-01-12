const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session Middleware
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const settingsRoutes = require("./routes/settings");

app.use(authRoutes);
app.use(dashboardRoutes);
app.use(settingsRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
