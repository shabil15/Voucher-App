const express = require("express");
const router = express.Router();

const USERNAME = "admin";
const PASSWORD = "password";

router.get("/", (req, res) => {
  if (req.session.loggedIn) return res.redirect("/dashboard");
  res.render("login");
});

const dummyUser = { username: 'admin', password: '12345' }; 

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === dummyUser.username && password === dummyUser.password) {
    req.session.user = dummyUser; 
    res.redirect('/dashboard');
    console.log('login success');
  } else {
    res.send('<h1>Invalid credentials. Please <a href="/">try again</a>.</h1>');
  }
});


router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

module.exports = router;
