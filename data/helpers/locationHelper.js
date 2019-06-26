const db = require("../dbConfig.js");

module.exports = {
  getAllPlaces,
  getPlaceById,
  addPlace,
  removePlace,
  getGooglePlaceBy
};

function getAllPlaces() {
  return db("locations");
}

function getPlaceById(id) {
  return db("locations")
    .where({ id })
    .first();
}

function getGooglePlaceBy(google_place_id) {
  console.log(google_place_id);
  return db("locations")
    .where({ google_place_id })
    .first();
}

async function addPlace(location) {
  return db("locations")
    .insert(location, "id")
    .then(ids => {
      return getPlaceById(ids[0]);
    });
}

async function removePlace(id) {
  return db("users")
    .where({ id })
    .del();
}
