const express = require("express");
const router = express.Router();
const Friends = require("../../data/helpers/friendsDbHelper");
const Users = require("../../data/helpers/userDbHelper");

//fix me add authorize/authentication for users
//so users can only access their own stuff

//request friend
router.get("/request/:user_uid/:friend_uid", async (req, res) => {
  const { user_uid, friend_uid } = req.params;
  //if user dne
  try {
    const userOne = await Users.getByUid(user_uid);
    const userTwo = await Users.getByUid(friend_uid);

    //if user one does not exist return bad request
    if (!userOne) {
      res
        .status(404)
        .json({ error: `user with id ${user_uid} does not exist` });
      //if user two does not exist return bad request
    } else if (!userTwo) {
      res
        .status(404)
        .json({ error: `user with id ${friend_uid} does not exist` });
    } else {
      const added = await Friends.request(user_uid, friend_uid);
      res.status(200).json(added);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//accept friend
router.get("/accept/:user_uid/:friend_uid", async (req, res) => {
  const { user_uid, friend_uid } = req.params;
  //if request isn't valid
  try {
    const userOne = await Users.getByUid(user_uid);
    const userTwo = await Users.getByUid(friend_uid);

    //if user one does not exist return bad request
    if (!userOne) {
      res
        .status(404)
        .json({ error: `user with id ${user_uid} does not exist` });
      //if user two does not exist return bad request
    } else if (!userTwo) {
      res
        .status(404)
        .json({ error: `user with id ${friend_uid} does not exist` });
    } else {
      const pendingRequest = await Friends.checkPending(user_uid, friend_uid);
      if (pendingRequest === undefined) {
        //if a pending friend requests from user two dne
        res.status(404).json({
          error: `pending friend request with ${friend_uid} does not exist`
        });
      } else {
        const added = await Friends.accept(user_uid, friend_uid);
        res.status(200).json(added);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//reject friend
router.get("/reject/:user_uid/:friend_uid", async (req, res) => {
  const { user_uid, friend_uid } = req.params;
  //if pending request does not exist
  try {
    const userOne = await Users.getByUid(user_uid);
    const userTwo = await Users.getByUid(friend_uid);

    //if user one does not exist return bad request
    if (!userOne) {
      res
        .status(404)
        .json({ error: `user with id ${user_uid} does not exist` });
      //if user two does not exist return bad request
    } else if (!userTwo) {
      res
        .status(404)
        .json({ error: `user with id ${friend_uid} does not exist` });
    } else {
      const pendingRequest = await Friends.checkPending(user_uid, friend_uid);
      if (!pendingRequest) {
        //if a pending friend requests from user two dne
        res.status(404).json({
          error: `pending friend request with ${friend_uid} does not exist`
        });
      } else {
        const rejected = await Friends.reject(user_uid, friend_uid);
        res.status(200).json(rejected);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:user_uid/:friend_uid", async (req, res) => {
  const { user_uid, friend_uid } = req.params;

  try {
    const userOne = await Users.getByUid(user_uid);
    const userTwo = await Users.getByUid(friend_uid);
    //if user dne
    if (!userOne) {
      res
        .status(404)
        .json({ error: `user with id ${user_uid} does not exist` });
      //if user two does not exist return bad request
    } else if (!userTwo) {
      res
        .status(404)
        .json({ error: `user with id ${friend_uid} does not exist` });
    } else {
      //delete a friend
      const deleted = await Friends.remove(user_uid, friend_uid);
      console.log(deleted);
      if (deleted === 2) {
        // if the friend is deleted
        res
          .status(200)
          .json({ message: `friend with id ${friend_uid} deleted` });
      } else {
        // friendship not successfully deleted
        res
          .status(404)
          .json({ error: `friendship with ${friend_uid} does not exist` });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get all friends
router.get("/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await Users.getByUid(uid);
    if (!user) {
      res.status(404).json({ message: `User with ${uid} does not exist` });
    } else {
      const acceptedFriends = await Friends.getAllFriends(uid);
      const pendingFriends = await Friends.getAllPendingFriends(uid);
      const allFriends = [...acceptedFriends, ...pendingFriends];
      res.status(200).json(allFriends);
    }
  } catch (error) {}
});

//get all pending friends
router.get("/:uid/pending", async (req, res) => {
  const { uid } = req.params;
  try {
    const users = await Friends.getAllPendingFriends(uid);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
