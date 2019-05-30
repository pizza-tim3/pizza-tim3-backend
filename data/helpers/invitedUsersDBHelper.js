const db = require("../dbConfig.js");

//need to get all users that have been invited, regardless of their accepted status.
//get all pending invitees
//get all users who have been invited and have accepted
//get all users who have been invited but have declined
//add invited users to a new event
//delete invited users from an existing event

module.exports = {
    getAllInvited
    // getInvitedAccepted,
    // getInvitedPending,
    // getInvitedDeclined,
    // addInvitedUser,
    // deleteInvitedUser,
    // updateStatus
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