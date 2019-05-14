const express = require('express');
const router = express.Router();

// All Users route

router.get('/', (req, res) => {
    res.status(200).json('Users route');
})

module.exports = router;