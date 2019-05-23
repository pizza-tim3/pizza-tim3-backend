const express = require("express");
const router = express.Router();
const Users = require("../../data/helpers/userDbHelper");
// All Users route

router.get("/", async (req, res) => {
  try {
    const users = await Users.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const user = req.body;
  if (
    !user.email ||
    !user.firebase_uid ||
    !user.username ||
    !user.first_name ||
    !user.last_name
  ) {
    res.status(400).json({ error: "Bad Request, please include all fields" });
  }
  try {
    const newUser = await Users.add(user);
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (
    !user.email ||
    !user.firebase_uid ||
    !user.username ||
    !user.first_name ||
    !user.last_name
  ) {
    res.status(400).json({ error: "Bad Request, please include all fields" });
  }
  try {
    const updatedUser = await Users.update(id, user);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.remove(id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
