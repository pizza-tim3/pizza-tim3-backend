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
      event_description
    } = req.body;

    if (event_name && event_description && event_date && organizer && place) {
      const newEvent = {
        event_name: event_name,
        event_description: event_description,
        event_date: event_date,
        organizer: organizer,
        place: place
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
      error: err
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
    if (event) {
      const invitedUsers = await InvitedUsers.getAllInvited(id);
      const acceptedUsers = await InvitedUsers.getAcceptedUsers(id);
      const pendingUsers = await InvitedUsers.getPendingUsers(id);
      const declinedUsers = await InvitedUsers.getDeclinedUsers(id);
      const comments = await Comments.getEventAllComments(id);

      event.acceptedUsers = acceptedUsers;
      event.pendingUsers = pendingUsers;
      event.declinedUsers = declinedUsers;
      event.invitedUsers = invitedUsers;
      event.comments = comments;
      event.location = event.place;

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
    const event = req.body;
    const id = req.params.id;
    if(id) {
      const result = await Events.update(id, event);
      res.status(200).json({ result, message: "Updated Successfully!"})
    } else {
      res.status(404).json({ message: "That event does not exist" });
    }
  } catch (e) {
    res.status(500).json({ error: e, message: "Cannot update event" })
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
  console.log("Get status:");
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
      console.log("Upcoming events: ",result);
      const upEvents = result.filter(event => {
        return event.event_date > currentEpoch;
      });
      res.status(200).json({ result: upEvents });
    } else {
      res.status(400).json({ message: "This event id doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ message: "error", error: error });
  }
});


router.get("/past/:id", async (req, res) => {
  
  try {
    const id = req.params.id;
    console.log("Get past events", id);
    if (id) {
      const result = await Events.getEventsforUser(id);
      console.log("Past events",result);
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
        if(result === 0){
          res.status(400).json({ message: "unable to update the user's status" })
        } else {
          res.status(200).json({ result });
        }
    } else {
      const result = await Events.updateToDeclinedStatus(id, event_id);
        if(result === 0){
          res.status(400).json({ message: "unable to update the user's status" })
        } else {
          res.status(200).json({ result });
        }
      res.status(200).json({ result });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cannot update the event", error: error });
  }
});

router.post("/:id/comments", async (req, res) => {
  const newComment = req.body;
  try {
    console.log(req.body)
    const rows = await Comments.add(newComment);
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
