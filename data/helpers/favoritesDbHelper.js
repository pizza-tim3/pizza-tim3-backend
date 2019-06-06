const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getById,
  getByUid,
  add,
  update,
  remove
};

async function getAll() {
  return await db
    .select(
      "favorites.id",
      "favorites.firebase_uid",
      "locations.google_place_id"
    )
    .from("favorites")
    .innerJoin("locations", "favorites.location_id", "locations.id");
}

function getById(id) {
  return db("favorites")
    .where({ id })
    .first();
}

//returns all favorites by a uid
function getByUid(uid) {
  return db("favorites").where({ firebase_uid: uid });
}

async function add(favorite) {
  console.log(favorite);
  return await db("favorites")
    .insert(favorite, "id")
    .then(ids => {
      return getById(ids[0]);
    });
}

async function update(uid, changes) {
  return await db("favorites")
    .where({ firebase_uid: uid })
    .update(changes, "id")
    .then(id => {
      return getById(id);
    });
}

async function remove(id) {
  return db("favorites")
    .where({ id })
    .del();
}
