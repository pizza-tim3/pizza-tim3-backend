const express = require("express");
const router = express.Router();
const Invited = require("../../data/helpers/invitedUsersDBHelper");

//gets all invited users for an event, regardless of status
router.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const invitedUsers = await Invited.getAllInvited(eventId);
    res.status(200).json(invitedUsers);
  } catch (e) {
    res.status(500).json("Message:", e);
  }
});

//gets all users with a pending invite
router.get("/:eventId/pending", async (req, res) => {
  const { eventId } = req.params;
  try {
    const invitedUsers = await Invited.getPendingUsers(eventId);
    res.status(200).json(invitedUsers);
  } catch (e) {
    res.status(500).json(e);
  }
});

//gets all users with a accepted invite
router.get("/:eventId/accepted", async (req, res) => {
  const { eventId } = req.params;
  try {
    console.log(req.body);
    const invitedUsers = await Invited.getAcceptedUsers(eventId);
    res.status(200).json(invitedUsers);
  } catch (e) {
    res.status(500).json(e);
    console.log(e.stack);
  }
});

//gets all users with a declined invite
router.get("/:eventId/declined", async (req, res) => {
  const { eventId } = req.params;
  try {
    const invitedUsers = await Invited.getDeclinedUsers(eventId);
    res.status(200).json(invitedUsers);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const invitedUsers = await Invited.addUserToEvent(req.body, eventId);
    res.status(200).json(invitedUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const invitedUsers = await Invited.deleteInvitedUser(req.body, eventId);
    res.status(200).json(invitedUsers);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:eventId/:userId/accept", async (req, res) => {
  const { eventId, userId } = req.params;
  try {
    const invitedUsers = await Invited.updateToAcceptedStatus(userId, eventId);
    res.status(200).json(invitedUsers);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:eventId/:userId/decline", async (req, res) => {
  const { eventId, userId } = req.params;
  try {
    const invitedUsers = await Invited.updateToDeclinedStatus(userId, eventId);
    res.status(200).json(invitedUsers);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
