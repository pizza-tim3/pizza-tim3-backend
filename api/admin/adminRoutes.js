const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const Users = require("../../data/helpers/userDbHelper");

router.get("/promote/:uid/", async (req, res) => {
  console.log("here");
  // add custom claims
  // Set admin privilege on the user corresponding to uid.
  const { uid } = req.params;
  const firebase_user_info = await admin.auth().getUser(uid);
  console.log("info", firebase_user_info);

  try {
    const user = await Users.getByUid(uid);
    if (user && firebase_user_info) {
      // The new custom claims will propagate to the user's ID token the
      // next time a new one is issued.
      //TODO CHECK IF ALREADY ADMIN
      await admin.auth().setCustomUserClaims(uid, { admin: true });
      res.status(200).json({ message: "user has been promoted to admin" });
    } else {
      res.status(404).json({ error: `user with id ${uid} does not exist` });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
