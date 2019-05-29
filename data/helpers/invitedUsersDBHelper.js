const db = require("../dbConfig.js");

//need to get all users that have been invited, regardless of their accepted status.
//get all pending invitees
//get all users who have been invited and have accepted
//get all users who have been invited but have declined
//add invited users to a new event
//delete invited users from an existing event

module.exports = {
    getAllInvited,
    getInvitedAccepted,
    getInvitedPending,
    getInvitedDeclined,
    addInvitedUser,
    deleteInvitedUser,
    updateStatus
  };

  function getAllInvited() {
      return db("invited")
        .where()
  }