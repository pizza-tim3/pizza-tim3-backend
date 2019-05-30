const express = require("express");
const router = express.Router();
const Invited = require("../../data/helpers/invitedUsersDBHelper");

router.get("/:eventId", async (req, res) => {
    const { eventId } = req.params;
    try {
        const invitedUsers = await Invited.getAllInvited(eventId);
        res.status(200).json(invitedUsers)
    } catch (e) {
        res.status(500).json('Message:', e)
    }
});

router.post("/:eventId", async(req, res) => {
    const { eventId } = req.params;
    try {
        const invitedUsers = await Invited.addUserToEvent(req.body, eventId);
        res.status(200).json(invitedUsers)
    } catch (error) {
        res.status(500).json(error)
    }
});

router.delete('/:eventId', async(req, res) => {
    const { eventId } = req.params;
    try {
        const invitedUsers = await Invited.deleteInvitedUser(req.body, eventId);
        res.status(200).json(invitedUsers);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;