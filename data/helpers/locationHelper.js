const db = require("../dbConfig.js");

module.exports = {
  getAllPlaces,
  getPlaceById,
  addPlace,
  removePlace,
};

function getAllPlaces() {
  return db("locations");
}

function getPlaceById(id) {
  console.log(id);
  return db("locations")
    .where({ id })
    .first();
}

// function addPlace(location) {
//   return db("locations").insert(location, "google_place_id");
// }

async function addPlace(location) {
  console.log(location);
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
