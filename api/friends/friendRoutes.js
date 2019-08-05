const express = require("express");
const router = express.Router();
const Friends = require("../../data/helpers/friendsDbHelper");
const Users = require("../../data/helpers/userDbHelper");

// get all friend requests that are pending
router.get('/pending/:uid', async(req, res) => {
    const { uid } = req.params;
    try{
      const results = await Friends.getAll();
      if(results.length > 1) {
        let newResults = await results.filter(i => {
          return i.friend_uid === uid
        });
        newResults = await newResults.filter(i => {
          return i.status === 'pending'
        })
        res.status(200).json({Success: 'retrieved successfully', newResults})
      } else {
        res.status(404).json({ Error: 'uid given does not exist' })
      }
    } catch(e) {
      res.status(500).json({ Error: 'error with server' })
    }
});


// get all friend requests that are accepted
router.get('/accepted/:uid', async(req, res) => {
  const { uid } = req.params;
  try{
    const results = await Friends.getAll();
    if(results.length > 1) {
      let newResults = await results.filter(i => {
        return i.friend_uid === uid
      });
      newResults = await newResults.filter(i => {
        return i.status === 'accepted'
      })
      res.status(200).json({Success: 'retrieved successfully', newResults})
    } else {
      res.status(404).json({ Error: 'uid given does not exist' })
    }
  } catch(e) {
    res.status(500).json({ Error: 'error with server' })
  }
});

// create a friend request
  router.post('/', async(req, res) => {
    const uid = req.body.uid;
    const fuid = req.body.fuid;
    try {
      const id = await Friends.request(uid, fuid);

      if(id.length > 0) {
        res.status(200).json({Success: 'Added successfully', ids: id})
      } else {
        res.status(201).json({ error: 'unable to create'})
      }
    } catch(e) {
      res.status(500).json({error: 'error in creation'});
    }
  })


// accept a friend request
router.put('/accept', async(req, res) => {
  const uid = req.body.uid;
  const fuid = req.body.fuid;

  try{
    const id = await Friends.accept(uid, fuid);

    if(id) {
      res.status(200).json({Success: 'Updated successfully', ids: id})
    } else {
      res.status(201).json({ error: 'unable to update' });
    }
  } catch(e) {
    res.status(500).json({ error: e, message: 'Issue on server side'})
  }
})

// reject a friend request
router.delete('/reject', async(req, res) => {
  const uid = req.body.uid;
  const fuid = req.body.fuid;
  console.log(uid, fuid)
  try{
    const id = await Friends.reject(uid, fuid);

    if(id) {
      res.status(200).json({Success: 'Deleted successfully', status: id})
    } else {
      res.status(201).json({ error: 'unable to remove' });
    }
  } catch(e) {
    res.status(500).json({ error: e, message: 'Issue on server side'})
  }
})

module.exports = router;
