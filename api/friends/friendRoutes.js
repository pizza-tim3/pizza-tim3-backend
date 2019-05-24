const express = require("express");
const router = express.Router();
const Friends = require("../../data/helpers/friendsDbHelper");
// All Users route

//fix me add authorize/authentication for users
//so users can only access their own stuff

//add friend
router.post("/", async (req, res) => {
  const user = req.body;
  try {
    const friendData = await Friends.add(user);
    res.status(200).json(friendData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
