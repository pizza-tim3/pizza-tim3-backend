const db = require("../dbConfig.js");
const promisify = require("../../utils/promisify");

module.exports = {
  request,
  accept,
  reject,
  remove,
  checkPending
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

async function request(user_uid, friend_uid) {
  // if request already exists don't request
  const [id] = await db("friends").insert({ user_uid, friend_uid }, "id");
  await db("friends")
    .update({ status: "pending" }, "id")
    .where({ id });
  const [pendingRequest] = await getById(id);
  return pendingRequest;
}

async function accept(user_uid, friend_uid) {
  //add friend to opposite side

  const [id] = await db("friends").insert({ user_uid, friend_uid }, "id");
  //update both with accepted

  await db("friends")
    .update({ status: "accepted" }, "id")
    .where({ id });
  await db("friends")
    .update({ status: "accepted" }, "id")
    .where({ user_uid: friend_uid, friend_uid: user_uid });

  //return accepted
  const [acceptedRequest] = await getById(id);
  return acceptedRequest;
}

async function reject(user_uid, friend_uid) {
  try {
    //get pending
    //update to reject

    // user 2 reject user 1's friend request
    const id = await db("friends")
      .update({ status: "rejected" }, "id")
      .where({ user_uid: friend_uid, friend_uid: user_uid, status: "pending" });
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
        user_uid: user_uid,
        friend_uid: friend_uid,
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
