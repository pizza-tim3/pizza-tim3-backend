const express = require("express");
const router = express.Router();
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

router.get("/", async (req, res) => {
  try {
    const users = await Users.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:user_uid", async (req, res) => {
  const { user_uid } = req.params;
  try {
    const user = await Users.getByUid(user_uid);
    if (!user) {
      res
        .status(404)
        .json({ error: `user with id ${user_uid} does not exist` });
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

router.put("/:user_uid", async (req, res) => {
  const { user_uid } = req.params;
  const user = req.body;
  const { email, firebase_uid, username, first_name, last_name } = user;
  if (!email || !firebase_uid || !username || !first_name || !last_name) {
    res.status(400).json({ error: "Bad Request, please include all fields" });
  }
  try {
    const updatedUser = await Users.update(user_uid, user);
    if (!updatedUser) {
      res
        .status(404)
        .json({ error: `user with id ${user_uid} does not exist` });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:user_uid", async (req, res) => {
  const { user_uid } = req.params;
  try {
    const user = await Users.remove(user_uid);
    if (!user) {
      res
        .status(404)
        .json({ error: `user with id ${user_uid} does not exist` });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
