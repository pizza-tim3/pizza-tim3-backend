const express = require("express");
const router = express.Router();
const Users = require("../../data/helpers/userDbHelper");
// All Users route
router.use(express.json());

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
