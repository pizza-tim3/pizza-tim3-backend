const express = require('express');
const router = express.Router();
const Comments = require("../../data/helpers/commentsDbHelper");

router.get("/", async (req, res) => {
  try {
    const comments = await Comments.getAll();
    if(comments.length < 1) {
      res.status(401).json({ err: 'No comments to display.' });
    } else {
      res.status(200).json(comments);
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/event/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const rows = await Comments.getByEvent(id);
    if (rows.length < 1) {
      res.status(401).json({ err: 'No comments to display.' });
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post("/event", async (req, res) => {
  const newComment = req.body;

  try {
    const rows = await Comments.add(newComment);
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;