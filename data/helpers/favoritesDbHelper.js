const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getById,
  getByUid,
  add,
  update,
  remove
};

function getAll() {
  return db("favorites");
}

function getById(id) {
  return db("favorites")
    .where({ id })
    .first();
}

//returns all favorites by a uid
function getByUid(uid) {
  return db("favorites")
    .where({ firebase_uid: uid })
    .first();
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

async function remove(uid, favorite_id) {
  return db("favorites")
    .where({ firebase_uid: uid, id: favorite_id })
    .del();
}
