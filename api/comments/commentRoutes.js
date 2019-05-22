const express = require('express');
const router = express.Router();
const Comments = require("../../data/helpers/commentDbHelper.js");

router.get("/", async (req, res) => {
  try {
    const rows = await Comments.getAll();
    res.status(200).json(rows);
    if (rows.length < 1) {
      res.status(404).json({ err: 'No comments to show.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;