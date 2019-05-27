const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getById,
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

async function add(user) {
  console.log(user);
  return await db("users")
    .insert(user, "id")
    .then(ids => {
      return getById(ids[0]);
    });
}

async function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes, "id")
    .then(id => {
      return getById(id);
    });
}

async function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

async function getAllFriends(id) {
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
    .whereNot("friends.user_id", "=", id)
    .leftJoin("users", "users.id", "friends.user_id");
}
