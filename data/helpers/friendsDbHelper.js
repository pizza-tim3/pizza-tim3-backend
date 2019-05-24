const db = require("../dbConfig.js");

module.exports = {
  request
};

// async function getAllFriendsFromUserId(id) {
//   return db
//     .select(
//       "users.email",
//       "users.username",
//       "users.first_name",
//       "users.last_name"
//     )
//     .from("friends")
//     .where({ user_id: id })
//     .leftJoin("users", "users.id", "friends");
// }

async function request(user_id, friend_id) {
  const [id] = await db("friends").insert({ user_id, friend_id }, "id");
  await db("friends")
    .update({ status: "pending" }, "id")
    .where({ id });
  const [pendingRequest] = await getById(id);
  return pendingRequest;
}

async function getById(id) {
  return db("friends").where({ id });
}

async function removeFriend(user_id, friend_id) {
  return db("friends")
    .where({ id })
    .del();
}
