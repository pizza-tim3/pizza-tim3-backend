const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getByEvent,
  add,
  update,
  remove,
};

function getAll() {
  return db("comments");
};

function getByEvent(event_id) {
  return db("comments")
    .where({ event_id })
    .first();
};

async function add(comment, event_id) {
  return db("comments")
    .insert(comment, "event_id")
    .where({ event_id });
};

async function update(id, changes) {
  return db("comments")
    .where({ id })
    .update(changes);
};

async function remove(id) {
  return db("comments")
    .where({ id })
    .del();
};