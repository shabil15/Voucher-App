const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
  })
);


const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const settingsRoutes = require("./routes/settings");
const pdfRoutes = require("./routes/pdf");

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    next();
});
app.use(authRoutes);
app.use(dashboardRoutes);
app.use(settingsRoutes);
app.use(pdfRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

