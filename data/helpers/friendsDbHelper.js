const db = require("../dbConfig.js");
const promisify = require("../../utils/promisify");

module.exports = {
  request,
  accept,
  reject,
  remove,
  checkPending,
  getAllFriends,
  getAllPendingFriends,
  checkFriendRequets
};

async function checkPending(user_uid, friend_uid) {
  //check if user one has a pending friend requests from user two
  const [request] = await db("friends").where({
    user_uid: friend_uid,
    friend_uid: user_uid,
    status: "pending"
  });
  return request;
}

//This selects user which either has  sent a request to me,
// or has been sent request by me.
async function checkFriendRequets(user_uid, friend_uid) {
  //check if user one has a pending friend requests from user two
  console.log("Check friend ", user_uid, friend_uid);
  const request = await db("friends")
    .where({
      user_uid: friend_uid,
      friend_uid: user_uid
    })
    .orWhere({
      user_uid: user_uid,
      friend_uid: friend_uid
    });
  return request;
}

//user_uid sends a friend request to friend_uid
/**
  {
    user_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
    friend_uid: "T90z5fuhXcWpE231iBvk0WntdKA2", //test5@gmail.com
    status: "pending"
  }
 */
async function request(user_uid, friend_uid) {
  // if request already exists don't request
  //insert on requestee

  const [requesteeId] = await db("friends").insert(
    { user_uid, friend_uid, status: "pending" },
    "id"
  );
  const [pendingRequest] = await getById(requesteeId);
  return pendingRequest;
}

async function accept(user_uid, friend_uid) {
  const trx = await promisify(db.transaction.bind(db));
  try {
    //update the request sender's table to accepted
    await trx("friends")
      .update({ status: "accepted" }, "id") //returns count of updated on sqlite3
      .where({ user_uid: friend_uid, friend_uid: user_uid });

    //insert corresponding friend table on acceptee's perspective
    const [senderId] = await trx("friends").insert(
      { user_uid, friend_uid, status: "accepted" },
      "id"
    );
    await trx.commit();

    return await db("friends")
      .where({
        id: senderId
      })
      .first();
  } catch (error) {
    await trx.rollback();
  }
}

async function reject(user_uid, friend_uid) {
  const trx = await promisify(db.transaction.bind(db));
  try {
    //update the request sender's table to accepted
    const id = await trx("friends")
      .update({ status: "rejected" }, "id")
      .where({ user_uid: friend_uid, friend_uid: user_uid, status: "pending" });
    await trx.commit();

    return await db("friends")
      .where({
        user_uid: friend_uid,
        friend_uid: user_uid,
        status: "rejected"
      })
      .first();
  } catch (error) {
    console.log(error.stack);
    await trx.rollback();
  }
}

async function getById(id) {
  return db("friends").where({ id });
}

/**
 * https://stackoverflow.com/a/56130889
 * this.stack overflow details how I managed to get
 * knex transactions to work with async await.
 * TL;DR you use the function promisify to wrap the transaction
 * and binding this to the database instance.
 */

// Returns 2 if successful, else returns 0
async function remove(user_uid, friend_uid) {
  //wrap knex's transaction function in a promise
  const trx = await promisify(db.transaction.bind(db));
  //remove the relationships on both sides
  try {
    // if this is one that means that the relationship on the other
    // table has been deleted
    const friendTableDeleted = await trx("friends")
      .del()
      .where({
        user_uid: friend_uid,
        friend_uid: user_uid,
        status: "accepted"
      });

    // if this is one that means that the relationship on the
    // current users table has been deleted
    const userTableDeleted = await trx("friends")
      .del()
      .where({
        user_uid,
        friend_uid,
        status: "accepted"
      });

    //if both are deleted
    if (friendTableDeleted + userTableDeleted === 2) {
      // return the number two
      await trx.commit();
      return friendTableDeleted + userTableDeleted;
    } else {
      // rollback changes and return zero
      await trx.rollback();
      return 0;
    }
  } catch (error) {
    console.log(error);
    await trx.rollback();
  }
}

//get all accepted
async function getAllFriends(uid) {
  return await db
    .select("*", "friends.status")
    .from("friends")
    .where("friends.user_uid", "=", uid)
    .andWhere("friends.status", "=", "accepted")
    .leftJoin("users", "users.firebase_uid", "friends.friend_uid");
}

//This is dumb and a mess but i'm not rewriting the friends
//architecture a 3rd time
async function getAllPendingFriends(uid) {
  //get from perspective of uid
  //get friends
  const pendingFriends = await db
    .select("*")
    .from("friends")
    .where(q =>
      q
        .where("friends.status", "=", "pending")
        .andWhere(qu =>
          qu
            .where("friends.friend_uid", "=", uid)
            .orWhere("friends.user_uid", "=", uid)
        )
    )
    .leftJoin("users", "users.firebase_uid", "friends.user_uid");

  //map and filter through pending friends to get all of the ids of the users
  //THIS uid has requested
  const uids = pendingFriends.reduce(
    (acc, friend) =>
      friend.friend_uid !== uid ? [...acc, friend.friend_uid] : [...acc],
    []
  );
  console.log("uids", uid, uids);

  //filter out entries where the user themselves are the requester
  const filtered = pendingFriends.filter(friend => friend.user_uid !== uid);
  console.log(filtered);

  // get all of the users THIS uid requested
  const recievers = await db
    .select("*")
    .from("users")
    .whereIn("users.firebase_uid", uids)
    .andWhere("friends.user_uid", "=", uid)
    .leftJoin("friends", "users.firebase_uid", "friends.friend_uid");

  //return an array of users the uid has friend requested
  return [...filtered, ...recievers];
}
