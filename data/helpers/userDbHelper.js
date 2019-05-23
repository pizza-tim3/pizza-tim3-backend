const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getById,
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
