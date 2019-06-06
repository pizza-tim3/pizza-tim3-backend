const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getByEvent,
  add,
  update,
  remove,
  getEventAllComments,
};

function getAll() {
  return db("comments");
}

function getByEvent(event_id) {
  return db("comments")
    .where({ event_id })
    .first();
}

function getEventAllComments(event_id) {
  return db("comments").where({ event_id });
}

async function add(comment) {
  return db("comments").insert(comment, "id");
}

async function update(id, changes) {
  return db("comments")
    .where({ id })
    .update(changes);
}

async function remove(id) {
  return db("comments")
    .where({ id })
    .del();
}
