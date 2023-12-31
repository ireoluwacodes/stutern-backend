const express = require("express")
const colors = require("colors")
// const mongoose = require('mongoose');
const app = express();

require("dotenv").config()

const route = require("./route")

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Specify the views directory
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.use("/", route)

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to my api",
  });
});
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});


const startApp = async () => {
  try {
  app.listen(process.env.PORT, console.log(`server is running on port ${process.env.PORT}`.red));
  } catch (error) {
    console.log(error);
  }
};

startApp();

module.exports = app
