const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const Users = require("../../data/helpers/userDbHelper");
// All Users route

//fix me add authorize/authentication for users
//so users can only access their own stuff
router.get("/", async (req, res) => {
  try {
    const users = await Users.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await Users.getByUid(uid);
    if (!user) {
      res.status(404).json({ error: `user with id ${uid} does not exist` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const user = req.body;
  const { email, firebase_uid, username, first_name, last_name } = user;
  if (!email || !firebase_uid || !username || !first_name || !last_name) {
    res.status(400).json({ error: "Bad Request, please include all fields" });
  } else {
    try {
      const newUser = await Users.add(user);

      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.put("/:uid", async (req, res) => {
  const { uid } = req.params;
  const user = req.body;
  const { email, firebase_uid, username, first_name, last_name } = user;
  if (!email || !firebase_uid || !username || !first_name || !last_name) {
    res.status(400).json({ error: "Bad Request, please include all fields" });
  }
  try {
    const updatedUser = await Users.update(uid, user);
    if (!updatedUser) {
      res.status(404).json({ error: `user with id ${uid} does not exist` });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await Users.remove(uid);
    if (!user) {
      res.status(404).json({ error: `user with id ${uid} does not exist` });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:uid/friends", async (req, res) => {
  const { uid } = req.params;
  try {
    const users = await Users.getAllFriends(uid);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:uid/friends/pending", async (req, res) => {
  const { uid } = req.params;
  try {
    const users = await Users.getAllPendingFriends(uid);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
