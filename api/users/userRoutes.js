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
    const user = await Users.getBy(id);
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
    !username ||
    !first_name ||
    !last_name
  ) {
    res.status(400).json({ error: "Bad Request, please include all fields" });
  }
  try {
    const user = await Users.add(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
