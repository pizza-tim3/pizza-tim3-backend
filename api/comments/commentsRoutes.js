const express = require("express");
const router = express.Router();
const Comments = require("../../data/helpers/commentsDbHelper");

const {
  verifyToken,
  setDecodedToken,
  setCustomClaims,
  checkAdmin
} = require("../../auth/firebase-middleware");
// All Users route

router.use("/", verifyToken, setDecodedToken, setCustomClaims);

router.get("/", checkAdmin, async (req, res) => {
  try {
    const comments = await Comments.getAll();
    if (comments.length < 1) {
      res.status(401).json({ err: "No comments to display." });
    } else {
      res.status(200).json(comments);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/event/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const rows = await Comments.getByEvent(id);
    if (rows.length < 1) {
      res.status(401).json({ err: "No comments to display." });
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/event/count/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Get comments foe event ", id);
  try {
    const rows = await Comments.getEventAllComments(id);
    console.log("Got count as ", rows);
    if (rows.length < 1) {
      res.status(401).json({ err: "No comments to display." });
    } else {
      res.status(200).json(rows.length, rows);
      console.log(rows);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/event/messages/:id", async (req, res) => {
  const id = req.params.id;
  console.log("HERE IS THE ID", id);
  try {
    if (id) {
      const comments = await Comments.getEventAllComments(id);
      res.status(200).json({ comments });
    } else {
      res.status(400).json({ message: "id not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
router.post("/event", async (req, res) => {
  const newComment = req.body;

  try {
    const rows = await Comments.add(newComment);
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedComment = req.body;

  try {
    const rows = await Comments.update(id, updatedComment);
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const rows = await Comments.remove(id);
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/event/messages/user/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Comments with user ", id);
  try {
    if (id) {
      const comments = await Comments.getEventAllUserComments(id);
      res.status(200).json({ comments });
      console.log(comments);
    } else {
      res.status(400).json({ message: "id not found" });
    }
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ error: error });
  }
});

//knex('comments').count({ event_id: id })
module.exports = router;
