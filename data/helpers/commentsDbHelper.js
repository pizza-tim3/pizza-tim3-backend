const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getByEvent,
  add,
  update,
  remove,
  getEventAllComments,
  getEventCommentsCount,
  getEventAllUserComments
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

async function getEventCommentsCount(event_id) {
  console.log("event id is", event_id);
  return db("comments").count(event_id);
  // console.log(db("comments").count({ event_id }))
}

async function getEventAllUserComments(event_id) {
  return db
    .select("comments.event_id", "user_id", "message", "time", "first_name")
    .from("comments")
    .where({ event_id })
    .innerJoin("users", "users.firebase_uid", "=", "comments.user_id");
}
async function getPastEventsforUser(id) {
  const currentEpoch = new Date().getTime();

  console.log("Get past ", id, currentEpoch);
  return;
  db.select(
    "event_id",
    "user_id",
    "event_name",
    "event_date",
    "google_place_id",
    "pending"
  )
    .from("invited")
    .where({ user_id: id }) //.where(currentEpoch,">", "event_date")
    .innerJoin("events", "invited.event_id", "=", "events.id")
    .innerJoin("locations", "locations.id", "=", "events.place");
}
