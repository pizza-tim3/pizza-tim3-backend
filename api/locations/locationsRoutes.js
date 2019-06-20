const express = require("express");
const router = express.Router();
const Place = require("../../data/helpers/locationHelper");

const {
  verifyToken,
  setDecodedToken,
  setCustomClaims
} = require("../../auth/firebase-middleware");

router.use(express.json());

router.get("/", (req, res) => {
  Place.getAllPlaces()
    .then(place => {
      if (place) {
        res.status(200).json(place);
      } else {
        res.status(404).json("Error: No places are in the database");
      }
    })
    .catch(e => {
      res.status(500).json(`Message: ${e}`);
    });
});

router.get("/:id", (req, res) => {
  Place.getPlaceById(req.params.id)
    .then(place => {
      if (place) {
        res.status(200).json(place);
      } else {
        res.status(404).json("Error: Could not find that location");
      }
    })
    .catch(e => res.status(500).json(`${e}`));
});

router.post("/", verifyToken, setDecodedToken, setCustomClaims, (req, res) => {
  // if(!req.body.place_Id) {
  //     res.status(500).json('Error: You are missing the place_Id')
  // }
  console.log(req.body);
  Place.addPlace(req.body)
    .then(place => {
      res.status(200).json(place);
    })
    .catch(e => {
      res.status(500).json(`${e}`);
    });
});

router.delete(
  "/:id",
  verifyToken,
  setDecodedToken,
  setCustomClaims,
  async (req, res) => {
    const deleting = await Place.removePlace(req.params.id)
      .then(id => {
        res
          .status(200)
          .json(`I removed placeId number ${req.params.id} from database`);
      })
      .catch(e => {
        res.status(500).json(`Message: ${e}`);
      });
  }
);

module.exports = router;
