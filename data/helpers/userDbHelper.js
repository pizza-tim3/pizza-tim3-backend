const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getById,
  getByUid,
  add,
  update,
  remove,
  getAllFriends
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
  console.log(user);
  return await db("users")
    .insert(user, "id")
    .then(ids => {
      return getById(ids[0]);
    });
}

async function update(uid, changes) {
  return db("users")
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

async function getAllFriends(uid) {
  return await db
    .select(
      "users.id",
      "users.firebase_uid",
      "users.email",
      "users.username",
      "users.first_name",
      "users.last_name"
    )
    .from("friends")
    .whereNot("friends.user_uid", "=", uid)
    .leftJoin("users", "users.id", "friends.user_uid");
}
