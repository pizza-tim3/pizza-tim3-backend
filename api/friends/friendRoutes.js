const express = require("express");
const router = express.Router();
const Friends = require("../../data/helpers/friendsDbHelper");
// All Users route

//fix me add authorize/authentication for users
//so users can only access their own stuff

//request friend
router.post("/request/:user_id/:friend_id", async (req, res) => {
  const { user_id, friend_id } = req.params;
  //if user dne
  try {
    const added = await Friends.request(user_id, friend_id);
    res.status(200).json(added);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
