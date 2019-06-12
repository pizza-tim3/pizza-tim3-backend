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
  return db("users");
}

function getById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getByUid(uid) {
  return db("users")
    .where({ firebase_uid: uid })
    .first();
}

async function add(user) {
  return await db("users")
    .insert(user, "id")
    .then(ids => {
      return getById(ids[0]);
    });
}

async function update(uid, changes) {
  return await db("users")
    .where({ firebase_uid: uid })
    .update(changes, "id")
    .then(id => {
      return getById(id);
    });
}

async function remove(uid) {
  return db("users")
    .where({ firebase_uid: uid })
    .del();
}
