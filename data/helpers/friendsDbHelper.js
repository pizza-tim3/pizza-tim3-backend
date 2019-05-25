const db = require("../dbConfig.js");

module.exports = {
  request,
  accept,
  reject
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
  // if request already exists don't request
  const [id] = await db("friends").insert({ user_id, friend_id }, "id");
  await db("friends")
    .update({ status: "pending" }, "id")
    .where({ id });
  const [pendingRequest] = await getById(id);
  return pendingRequest;
}

async function accept(user_id, friend_id) {
  //add friend to opposite side

  const [id] = await db("friends").insert({ user_id, friend_id }, "id");
  //update both with accepted

  await db("friends")
    .update({ status: "accepted" }, "id")
    .where({ id });
  await db("friends")
    .update({ status: "accepted" }, "id")
    .where({ user_id: friend_id, friend_id: user_id });

  //return accepted
  const [acceptedRequest] = await getById(id);
  return acceptedRequest;
}

async function reject(user_id, friend_id) {
  try {
    //get pending
    //update to reject

    // user 2 reject user 1's friend request
    const id = await db("friends")
      .update({ status: "rejected" }, "id")
      .where({ user_id: friend_id, friend_id: user_id, status: "pending" });
    //return rejected

    const [rejectedRequest] = await getById(id);
    return rejectedRequest;
  } catch (error) {
    console.log(error);
  }
}

async function getById(id) {
  return db("friends").where({ id });
}
