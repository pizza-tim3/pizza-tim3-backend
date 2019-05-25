const express = require("express");
const router = express.Router();
const Friends = require("../../data/helpers/friendsDbHelper");
// All Users route

//fix me add authorize/authentication for users
//so users can only access their own stuff

//request friend
router.get("/request/:user_id/:friend_id", async (req, res) => {
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

//accept friend
router.get("/accept/:user_id/:friend_id", async (req, res) => {
  const { user_id, friend_id } = req.params;
  //if user dne

  //if request isn't valid
  try {
    const added = await Friends.accept(user_id, friend_id);
    res.status(200).json(added);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//reject friend
router.get("/reject/:user_id/:friend_id", async (req, res) => {
  const { user_id, friend_id } = req.params;
  //if user dne
  //if pending request does not exist

  try {
    const added = await Friends.reject(user_id, friend_id);
    res.status(200).json(added);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:user_id/:friend_id", async (req, res) => {
  const { user_id, friend_id } = req.params;
  //if user dne

  //if request isn't valid
  try {
    const deleted = await Friends.remove(user_id, friend_id);
    if (deleted === 2) {
      res.status(200).json({ message: "friend deleted" });
    } else {
      res.status(500).json({ message: "could not delete friend" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
