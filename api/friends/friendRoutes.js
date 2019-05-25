const express = require("express");
const router = express.Router();
const Friends = require("../../data/helpers/friendsDbHelper");
const Users = require("../../data/helpers/userDbHelper");
// All Users route

//fix me add authorize/authentication for users
//so users can only access their own stuff

//request friend
router.get("/request/:user_id/:friend_id", async (req, res) => {
  const { user_id, friend_id } = req.params;
  //if user dne
  try {
    const userOne = await Users.getById(user_id);
    const userTwo = await Users.getById(friend_id);

    //if user one does not exist return bad request
    if (!userOne) {
      res.status(404).json({ error: `user with id ${user_id} does not exist` });
      //if user two does not exist return bad request
    } else if (!userTwo) {
      res
        .status(404)
        .json({ error: `user with id ${friend_id} does not exist` });
    } else {
      const added = await Friends.request(user_id, friend_id);
      res.status(200).json(added);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//accept friend
router.get("/accept/:user_id/:friend_id", async (req, res) => {
  const { user_id, friend_id } = req.params;

  //if request isn't valid
  try {
    const userOne = await Users.getById(user_id);
    const userTwo = await Users.getById(friend_id);
    const pendingRequest = await Friends.checkPending(user_id, friend_id);

    //if user one does not exist return bad request
    if (!userOne) {
      res.status(404).json({ error: `user with id ${user_id} does not exist` });
      //if user two does not exist return bad request
    } else if (!userTwo) {
      res
        .status(404)
        .json({ error: `user with id ${friend_id} does not exist` });
    } else if (pendingRequest === undefined) {
      //if a pending friend requests from user two dne
      res.status(404).json({
        error: `pending friend request with ${friend_id} does not exist`
      });
    } else {
      //
      const added = await Friends.accept(user_id, friend_id);
      res.status(200).json(added);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//reject friend
router.get("/reject/:user_id/:friend_id", async (req, res) => {
  const { user_id, friend_id } = req.params;

  //if pending request does not exist
  try {
    const userOne = await Users.getById(user_id);
    const userTwo = await Users.getById(friend_id);
    const pendingRequest = await Friends.checkPending(user_id, friend_id);

    //if user one does not exist return bad request
    if (!userOne) {
      res.status(404).json({ error: `user with id ${user_id} does not exist` });
      //if user two does not exist return bad request
    } else if (!userTwo) {
      res
        .status(404)
        .json({ error: `user with id ${friend_id} does not exist` });
    } else if (!pendingRequest) {
      //if a pending friend requests from user two dne
      res.status(404).json({
        error: `pending friend request with ${friend_id} does not exist`
      });
    } else {
      const rejected = await Friends.reject(user_id, friend_id);
      res.status(200).json(rejected);
    }
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
