const express = require("express");
const router = express.Router();
const Users = require("../../data/helpers/userDbHelper.js");
// All Users route

router.get("/", (req, res) => {
  Users.getAll()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json("There are users");
      }
    })
    .catch(err => {
      res.status(500).json(`${err}`);
    });
});

module.exports = router;
