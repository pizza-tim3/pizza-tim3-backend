const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getBy,
  add,
  update,
  remove,
  getPendingEventsforUser,
  updateToAcceptedStatus,
  updateToDeclinedStatus,
  getEventsforUser,
  getPastEventsforUser
};
function getAll() {
  return db("events");
}

function getBy(id) {
  return db("events")
    .where({ id })
    .first();
}
async function add(event) {
  console.log("Adding event", event);
  const [id] = await db("events").insert(event, ["id"]); //return arrays of ids
  return id;
}

// function getBy(id) {
//   return db("events")
//     .where({ id })
//     .first();
// }

async function update(id, changes) {
  console.log(id);
  console.log(changes);
  await db("events")
    .where({ id })
    .update(changes);

  return await db("events")
    .where({ id })
    .first();
}

async function remove(id) {
  return db("events")
    .where({ id })
    .del();
}

async function getPendingEventsforUser(id) {
  console.log("Get ", id);
  return db
    .select(
      "event_id",
      "user_id",
      "event_name",
      "event_date",
      "google_place_id",
      "pending"
    )
    .from("invited")
    .where({ user_id: id, pending: "true" })
    .innerJoin("events", "invited.event_id", "=", "events.id")
    .innerJoin("locations", "locations.google_place_id", "=", "events.place");
}
async function updateToAcceptedStatus(userId, eventId) {
  console.log("Accepted ", userId, eventId);
  return await db("invited")
    .where({
      event_id: eventId,
      user_id: userId
    })
    .update({
      accepted: true,
      pending: false
    });
}
async function updateToDeclinedStatus(userId, eventId) {
  return await db("invited")
    .where({
      event_id: eventId,
      user_id: userId
    })
    .update({
      declined: true,
      pending: false
    });
}

async function getEventsforUser(id) {
  const currentEpoch = new Date().getTime();

  console.log("Get upcoming ", id, currentEpoch);
  return db
    .select(
      "event_id",
      "user_id",
      "event_name",
      "event_date",
      "google_place_id",
      "pending"
    )
    .from("invited")
    .where({ user_id: id }) //.where(currentEpoch,"<", "events.event_date")
    .innerJoin("events", "invited.event_id", "=", "events.id")
    .innerJoin("locations", "locations.google_place_id", "=", "events.place")
    .then( function( resp ){
      console.log("Response" , resp );
      return resp;
    }).catch(function(err) {
      console.log("Error : ",err);
    });
}

async function getPastEventsforUser(id) {
  const currentEpoch = new Date().getTime();

  console.log("Get past ", id, currentEpoch);
  return db
    .select(
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

async function getCommentsForEvents(id) {
  return db.select("event_id");
}
