const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getBy,
  add,
  update,
  remove,
};

function getAll() {
  return db("users");
}

function getBy(id) {
  return db("users")
    .where({ id })
    .first();
}

async function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      return getById(ids[0]);
    });
}

async function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

async function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
