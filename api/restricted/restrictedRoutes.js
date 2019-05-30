const express = require("express");
const router = express.Router();

//import the restricted
const {
  verifyToken,
  verifyUser,
  checkAdmin
} = require("../../auth/firebase-middleware");

//restricted route example
router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Veiwing a restricted page!" });
});

// make sure the user trying to modify anything is the same user that's making the request
router.get("/:uid", verifyToken, verifyUser, (req, res) => {
  res.status(200).json({ message: "Veiwing a user specific restricted page!" });
});
router.get("/:uid/admin", verifyToken, verifyUser, checkAdmin, (req, res) => {
  res.status(200).json({
    message: "Veiwing a user specific restricted page with admin status!"
  });
});
module.exports = router;
