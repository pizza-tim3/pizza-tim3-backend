const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const Users = require("../../data/helpers/userDbHelper");
const {
  verifyToken,
  setDecodedToken,
  setCustomClaims,
  verifyUser
} = require("../../auth/firebase-middleware");
// All Users route

router.use(
  "/:user_uid",
  verifyToken,
  setDecodedToken,
  setCustomClaims,
  verifyUser
);

// promote a user to administrator
router.get("/promote/:user_uid/", async (req, res) => {
  const { user_uid } = req.params;
  try {
    const firebase_user_info = await admin.auth().getUser(user_uid);
    const user = await Users.getByUid(user_uid);
    //make sure the user exists both on our back and and fire based
    if (user && firebase_user_info) {
      //TODO CHECK IF ALREADY ADMIN
      // The new custom claims will propagate to the user's ID token the
      // next time a new one is issued.
      await admin.auth().setCustomUserClaims(user_uid, { admin: true });
      res.status(200).json({ message: "user has been promoted to admin" });
    } else {
      res
        .status(404)
        .json({ error: `user with id ${user_uid} does not exist` });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/demote/:user_uid/", async (req, res) => {
  const { user_uid } = req.params;
  try {
    const firebase_user_info = await admin.auth().getUser(user_uid);
    const user = await Users.getByUid(user_uid);
    //make sure the user exists both on our back and and fire based
    if (user && firebase_user_info) {
      //TODO CHECK IF ALREADY ADMIN
      await admin.auth().setCustomUserClaims(user_uid, { admin: false });
      res.status(200).json({ message: "admin privileges revoked" });
    } else {
      res
        .status(404)
        .json({ error: `user with id ${user_uid} does not exist` });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
