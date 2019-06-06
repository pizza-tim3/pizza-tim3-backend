const express = require("express");
const router = express.Router();
const Users = require("../../data/helpers/userDbHelper");
const Favorites = require("../../data/helpers/favoritesDbHelper");
const {
  verifyToken,
  verifyUser,
  checkAdmin
} = require("../../auth/firebase-middleware");
// All Favorites route

//fix me add authorize/authentication for users
//so users can only access their own stuff
//I've commented out the middleware that should go in each route
router.get(
  "/",
  /* verifyToken,checkAdmin*/ async (req, res) => {
    try {
      const favorites = await Favorites.getAll();
      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get(
  "/:uid",
  /* verifyToken,verifyUser*/ async (req, res) => {
    const { uid } = req.params;
    try {
      const user = Users.getByUid(uid);
      if (!user) {
        res.status(404).json({ error: `user with id ${uid} does not exist` });
      } else {
        const favorites = await Favorites.getByUid(uid);
        res.status(200).json(favorites);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.post(
  "/:uid",
  /* verifyToken,verifyUser*/ async (req, res) => {
    const { uid } = reg.params;
    const favorite = req.body;
    try {
      const user = Users.getByUid(uid);
      if (!user) {
        res.status(404).json({ error: `user with id ${uid} does not exist` });
      } else {
        const newFavorite = await Favorites.add(favorite);
        res.status(200).json(newFavorite);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

router.delete("/:uid/:favorite_id", async (req, res) => {
  const { uid, favorite_id } = req.params;
  try {
    const removed = await Favorites.remove(uid, favorite_id);
    if (!removed) {
      res
        .status(404)
        .json({ error: `favorite with id ${favorite_id} does not exist` });
    }
    res.status(200).json({ message: "Favorite deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
