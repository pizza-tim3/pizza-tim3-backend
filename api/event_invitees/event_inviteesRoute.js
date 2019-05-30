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
})

module.exports = router;