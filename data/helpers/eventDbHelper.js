const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getBy,
  add,
  update,
  remove
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


async function update(id, changes) {
  return db("events")
    .where({ id })
    .update(changes);
}

async function remove(id) {
  return db("events")
    .where({ id })
    .del();
}
