const express = require("express");
const router = express.Router();
const Users = require("../../data/helpers/userDbHelper");

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

  module.exports = router;