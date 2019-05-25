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

const eventRoutes = require("./api/events/eventRoutes");
const userRoutes = require("./api/users/userRoutes");
const locationRoutes = require("./api/locations/locationsRoutes");
const commentsRoutes = require("./api/comments/commentsRoutes");
const friendsRoutes = require("./api/friends/friendRoutes");

// Home Route
server.get("/", (req, res) => {
  res.status(200).json("Home Page up and running");
});

//restricted route example
server.get("/restricted", (req, res) => {
  res.status(200).json("Veiwing a restricted page!");
});

// Users Resource Route
server.use("/api/users/", userRoutes);
server.use("/api/placesId/", locationRoutes);
server.use("/api/events", eventRoutes);
server.use("/api/comments", commentsRoutes);
server.use("/api/friends", friendsRoutes);

module.exports = server;
