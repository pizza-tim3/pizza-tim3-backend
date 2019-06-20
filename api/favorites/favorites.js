const express = require("express");
const router = express.Router();
const Users = require("../../data/helpers/userDbHelper");
const Favorites = require("../../data/helpers/favoritesDbHelper");
const {
  verifyToken,
  verifyUser,
  checkAdmin
} = require("../../auth/firebase-middleware");

router.get("/", verifyToken, verifyUser, checkAdmin, async (req, res) => {
  try {
    const favorites = await Favorites.getAll();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:user_uid", verifyToken, verifyUser, async (req, res) => {
  const { user_uid } = req.params;
  try {
    const user = await Users.getByUid(user_uid);
    if (!user) {
      res
        .status(404)
        .json({ error: `user with id ${user_uid} does not exist` });
    } else {
      const favorites = await Favorites.getByUid(user_uid);
      res.status(200).json(favorites);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//TODO MAKE IT SO YOU CAN"T ADD FAVORITE TWICE
router.post("/", verifyToken, verifyUser, async (req, res) => {
  const favorite = req.body;
  const { firebase_uid, google_place_id } = favorite;
  if (!firebase_uid || !google_place_id) {
    res.status(401).json({
      error: `please send and object structured like :{
        firebase_uid: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        location_id: "xxxxxxxx-xxxxxxxxx-xxxxxxxx"
      }`
    });
  } else {
    try {
      const user = await Users.getByUid(firebase_uid);
      if (!user) {
        res
          .status(404)
          .json({ error: `user with id ${firebase_uid} does not exist` });
      } else {
        const newFavorite = await Favorites.add(favorite);
        res.status(200).json(newFavorite);
      }
    } catch (err) {
      console.log(err.stack);
      res.status(500).json(err);
    }
  }
});

router.delete("/:id", verifyToken, verifyUser, async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Favorites.remove(id);
    if (!removed) {
      res.status(404).json({ error: `favorite with id ${id} does not exist` });
    }
    res.status(200).json({ message: "Favorite deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
