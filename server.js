const dotenv = require("dotenv").config();
const express = require("express");
const request = require('request');
const server = express();
const logger = require("morgan");
const helmet = require("helmet");
const firebase = require("./auth/firebaseInit");

//authorization middleware, read, decode, verify
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;
  try {
    if (idToken) {
      const decodedToken = await firebase.auth().verifyIdToken(idToken);

      if(decodedToken) {
        req.body.uid = decodedToken.uid
      }

      return next();
    } else {
      res.status(401).json({ message: "You are not unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


// Add Cross-origin resource sharing, protect server app with helmet, add logging middleware to our server )

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization");
  next();
},
  express.json(), helmet(), logger("dev")
);

const eventRoutes = require("./api/events/eventRoutes");
const userRoutes = require("./api/users/userRoutes");
const locationRoutes = require("./api/locations/locationsRoutes");
const commentsRoutes = require("./api/comments/commentsRoutes");
const friendsRoutes = require("./api/friends/friendRoutes");
const invitedRoutes = require("./api/event_invitees/event_inviteesRoute");
const favoritesRoutes = require("./api/favorites/favorites");
// const restrictedRoutes = require("./api/restricted/restrictedRoutes");
// const adminRoutes = require("./api/admin/adminRoutes");
const emailRoutes = require("./api/emails/freshInv");

// Home Route
server.get("/", (req, res) => {
  res.status(200).json("Home Page up and running");
});

// Users Resource Route
server.use('/', verifyToken);
server.use("/api/users/", userRoutes);
server.use("/api/placesId/", locationRoutes);
server.use("/api/events", eventRoutes);
server.use("/api/comments", commentsRoutes);
server.use("/api/friends", friendsRoutes);
server.use("/api/invited", invitedRoutes);
server.use("/api/favorites", favoritesRoutes);
// server.use("/api/restricted", restrictedRoutes);
// server.use("/api/admin", adminRoutes);
server.use("/api/sendEmail", emailRoutes);

module.exports = server;
