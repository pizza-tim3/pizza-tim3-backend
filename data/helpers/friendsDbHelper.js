const db = require("../dbConfig.js");

module.exports = {
  addFriend
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

async function addFriend(user_id, friend_id) {
  return db("friends")
    .insert({ user_id, friend_id }, "id")
    .then(ids => {
      console.log(ids);
    });
}

async function removeFriend(user_id, friend_id) {
  return db("friends")
    .where({ id })
    .del();
}
