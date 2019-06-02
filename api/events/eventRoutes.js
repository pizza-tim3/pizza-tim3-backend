const express = require("express");
const router = express.Router();
const InvitedUsers = require("../../data/helpers/invitedUsersDBHelper");
const Events = require("../../data/helpers/eventDbHelper");
const Locations = require("../../data/helpers/locationHelper");
const Comments = require("../../data/helpers/commentsDbHelper");

router.post("/", async (req, res) => {
  try {
    const {
      event_name,
      event_date,
      organizer,
      place,
      event_description,
    } = req.body;

    if (event_name && event_description && event_date && organizer && place) {
      const newEvent = {
        event_name: event_name,
        event_description: event_description,
        event_date: event_date,
        organizer: organizer,
        place: place,
      };

      const eid = await Events.add(newEvent);
      if (!eid || eid <= 0) {
        res.status(400).json({ message: "Events can't get added" });
      } else {
        res.status(200).json({ message: "Events added" });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "we can't add the new record in event table",
      error: err,
    });
  }
});

router.get("/", (req, res) => {
  try {
    const events = Events.getAll().then(events => {
      if (events) {
        res.status(200).json(events);
      } else {
        res.status(400).json({ message: "Events not found" });
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "we can't retrieve the events ", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Events.getBy(id);

    if (event) {
      res.status(200).json({ event });
    } else {
      res.status(400).json({ message: "Event doesn't exsist" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "We can't retrieve the event", error: err });
  }
});

router.get("/:id/details", async (req, res) => {
  try {
    const id = req.params.id;
    // Get Events, Locations, Invited Users and Comments associated with an event and create one event response object.
    let event = await Events.getBy(id);
    const eventLocation = await Locations.getPlaceById(event.place);
    const invitedUsers = await InvitedUsers.getAllInvited(id);
    const comments = await Comments.getByEvent(id);
    event.invitedUsers = invitedUsers;
    event.comments = comments;
    event.location = eventLocation;

    if (event) {
      res.status(200).json({ event });
    } else {
      res.status(404).json({ message: "Event doesn't exsist" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "We can't retrieve the event", error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const event = req.body;

    if (id && event) {
      const result = await Events.update(id, event);
      res.status(200).json({ result });
    }
    if (!id) {
      res.status(400).json({ message: "Event id doesn't exsist" });
    } else {
      res.status(400).json({ message: "Event body has issues" });
    }
  } catch (err) {
    res.status(500).json({ message: "We can't update the event", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (id) {
      const result = await Events.remove(id);
      res.status(200).json({ result, message: "event successfully removed" });
    } else {
      res.status(400).json({ message: "This event id doesn't exist" });
    }
  } catch (err) {
    res.status(500).json({ message: "We can't delete this event", error: err });
  }
});

module.exports = router;
