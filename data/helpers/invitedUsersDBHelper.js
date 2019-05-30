const db = require("../dbConfig.js");

//need to get all users that have been invited, regardless of their accepted status.
//get all pending invitees
//get all users who have been invited and have accepted
//get all users who have been invited but have declined
//add invited users to a new event
//delete invited users from an existing event

module.exports = {
    getAllInvited,
    getAcceptedUsers,
    getPendingUsers,
    getDeclinedUsers,
    addUserToEvent,
    deleteInvitedUser,
    updateToAcceptedStatus,
    updateToDeclinedStatus
  };

  async function getAllInvited(eventId) {
      return await db
        .select(
          "users.id",
          "users.firebase_uid",
          "users.email",
          "users.username",
          "users.first_name",
          "users.last_name"
        )
        .from("invited")
        .where("event_id", eventId)
        .leftJoin("users", "users.firebase_uid", "user_id");
  }

  async function getAcceptedUsers(eventId) {
    let users = await db
      .select(
        "users.id",
        "users.firebase_uid",
        "users.email",
        "users.username",
        "users.first_name",
        "users.last_name"
      )
      .from('invited')
      .where({
        event_id: eventId,
        accepted: true
      })
      .leftJoin("users", "users.firebase_uid", "user_id");
      return users;
      //select all user info, then from invited table where event_id = the id passed in and accepted is true
      //left join the users returned
  }

  async function getPendingUsers(eventId) {
    return await db
      .select(
        "users.id",
        "users.firebase_uid",
        "users.email",
        "users.username",
        "users.first_name",
        "users.last_name"
      )
      .from('invited')
      .where({
        event_id: eventId,
        pending: true
      })
      .leftJoin("users", "users.firebase_uid", "user_id");
      //select all user info, then from invited table where event_id = the id passed in and pending is true
      //left join the users returned
  }

  async function getDeclinedUsers(eventId) {
    return await db
      .select(
        "users.id",
        "users.firebase_uid",
        "users.email",
        "users.username",
        "users.first_name",
        "users.last_name"
      )
      .from('invited')
      .where({
        event_id: eventId,
        declined: true
      })
      .leftJoin("users", "users.firebase_uid", "user_id");
    //select all user info, then from invited table where event_id = the id passed in and declined is true
      //left join the users returned
  }

  async function addUserToEvent (user, eventId) {
    console.log(user);
    return await db('invited')
      .insert(user)
      .where('event_id', eventId);
  }

  async function deleteInvitedUser (userId, eventId) {
    return await db('invited')
      .where({
        event_id: eventId,
        user_id: userId
      })
      .select('id')
      .del();
  }

  async function updateToAcceptedStatus (userId, eventId) {
    return await db('invited')
      .where({
        event_id: eventId,
        user_id: userId
      })
      .update({
        'accepted': true,
        'pending': false
      })
  }

  async function updateToDeclinedStatus (userId, eventId) {
    return await db('invited')
      .where({
        event_id: eventId,
        user_id: userId
      })
      .update({
        'declined': true,
        'pending': false
      })
  }