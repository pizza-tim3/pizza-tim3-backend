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
    const comments = await Comments.getEventAllComments(id);
    event.invitedUsers = invitedUsers;
    event.comments = comments;
    event.location = eventLocation;

    if (event) {
      res.status(200).json({ event });
    } else {
      res.status(404).json({ message: "Event doesn't exist" });
    }
  } catch (err) {
    function dumpError(err) {
      if (typeof err === "object") {
        if (err.message) {
          console.log("\nMessage: " + err.message);
        }
        if (err.stack) {
          console.log("\nStacktrace:");
          console.log("====================");
          console.log(err.stack);
        }
      } else {
        console.log("dumpError :: argument is not an object");
      }
    }
    dumpError(err);
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

router.get("/pending/:id", async (req, res) => {
  console.log("Get status");
  try {
    const id = req.params.id;
    if (id) {
      const result = await Events.getPendingEventsforUser(id);
      res.status(200).json({ result: result });
    } else {
      res.status(400).json({ message: "This event id doesn't exist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "we can't find such events", error: error });
  }
});

router.get("/upcoming/:id", async (req, res) => {
  console.log("Get status");
  try {
    const id = req.params.id;
    if (id) {
      const result = await Events.getEventsforUser(id);
      const currentEpoch = new Date().getTime();
      console.log(result);
      const upEvents = result.filter(event => {
        return event.event_date > currentEpoch;
      });
      res.status(200).json({ result: upEvents });
    } else {
      res.status(400).json({ message: "This event id doesn't exist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "we can't find such events", error: error });
  }
});

router.get("/past/:id", async (req, res) => {
  console.log("Get status");
  try {
    const id = req.params.id;
    if (id) {
      const result = await Events.getEventsforUser(id);
      const currentEpoch = new Date().getTime();
      const pastEvents = result.filter(event => {
        return event.event_date < currentEpoch;
      });
      res.status(200).json({ result: pastEvents });
    } else {
      res.status(400).json({ message: "This event id doesn't exist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "we can't find such events", error: error });
  }
});

router.put("/status/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const event_id = req.body.event_id;
    const is_accepted = req.body.is_accepted;

    console.log(event_id, is_accepted, id);

    if (is_accepted === true) {
      const result = await Events.updateToAcceptedStatus(id, event_id);
      res.status(200).json({ result });
    } else {
      const result = await Events.updateToDeclinedStatus(id, event_id);
      res.status(200).json({ result });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "we can't  status update such events", error: error });
  }
});

router.post("/:id/comments", async (req, res) => {
  const newComment = req.body;
  try {
    const rows = await Comments.add(newComment);
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
