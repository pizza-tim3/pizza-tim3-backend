const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const logger = require("morgan");
const helmet = require("helmet");

// Add Cross-origin resource sharing, protect server app with helmet, add logging middleware to our server )
server.use(express.json(), cors(), helmet(), logger("dev"));

//import firebase initialization and invoke it
const initializeFirebBase = require("./auth/firebaseInit");
initializeFirebBase();

//import the restricted
const firebaseMiddleware = require("./auth/firebase-middleware");

const userRoutes = require("./api/users/userRoutes");
const commentRoutes = require("./api/comments/commentRoutes.js");

// Home Route
server.get("/", (req, res) => {
  res.status(200).json("Home Page up and running");
});

//restricted route example
server.get("/restricted", firebaseMiddleware, (req, res) => {
  res.status(200).json("Veiwing a restricted page!");
});

// Users Resource Route
server.use("/api/users/", userRoutes);
server.use("/api/comments/", commentRoutes);

module.exports = server;
