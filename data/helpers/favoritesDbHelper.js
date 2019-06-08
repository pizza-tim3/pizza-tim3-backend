const db = require("../dbConfig.js");
const promisify = require("../../utils/promisify");

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
async function getByUid(uid) {
  return await db
    .select(
      "favorites.id",
      "favorites.firebase_uid",
      "locations.google_place_id"
    )
    .from("favorites")
    .where({ firebase_uid: uid })
    .innerJoin("locations", "favorites.location_id", "locations.id");
}

//could refactor this but am strapped for time rn
async function add(favorite) {
  //wrap knex's transaction function in a promise
  const trx = await promisify(db.transaction.bind(db));
  //get google_place_id from the favorite object
  const { google_place_id, firebase_uid } = favorite;

  try {
    //get the id from the associated place, if doesn't exist make it?
    let id;

    id = await trx
      .select("id")
      .from("locations")
      .where({ google_place_id })
      .first().id;

    //location doesn't exist
    if (!id) {
      [id] = await trx("locations").insert({ google_place_id });
    }
    //assemble favorite object
    const favoriteObj = {
      firebase_uid,
      location_id: id
    };
    const [newFavoriteId] = await trx("favorites").insert(favoriteObj, "id");

    //no problems, commit
    await trx.commit();

    //return favorite
    const [newFav] = await db
      .select(
        "favorites.id",
        "favorites.firebase_uid",
        "locations.google_place_id"
      )
      .from("favorites")
      .where({ "favorites.id": newFavoriteId })
      .leftJoin("locations", "favorites.location_id", "locations.id");

    return newFav;
  } catch (error) {
    await trx.rollback();
    console.log(error.stack);
  }
}

// async function add(favorite) {
//   return await db("favorites")
//     .insert(favorite, "id")
//     .then(ids => {
//       return getById(ids[0]);
//     });
// }

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
