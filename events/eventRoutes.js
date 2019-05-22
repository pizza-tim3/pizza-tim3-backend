const express = require("express");
const router = express.Router();
const Users = require("../data/helpers/userDbHelper");
const Events = require("../data/helpers/eventDbHelper");

router.post("/", async (req, res) => {
  try {
    const event = req.body;
    //checking all the conditions for a valid  event

    if (
      event.event_name &&
      //event.event_description &&
      event.event_date &&
      event.organiser &&
      event.place
    ) {
      const newEvent = {
        event_name: event.event_name,
        event_description: event.event_description,
        event_date: event.event_date,
        organiser: event.organiser,
        place: event.place
      };
      const eid = Events.add(newEvent);
      if (!eid || eid <= 0) {
        console.log("  event not  added");
        res.status(400).json({ message: "Events can't get added" });
      } else {
        res.status(200).json({ message: "Events added" });
      }
    }
  } catch (err) {
    res.status(500).json({message: "we can't add the new record in event table",error: error });
  }
});

router.get("/",(req,res)=>{
  console.log("here are the events")
 try{
     const events=  Events.getAll().then(events =>{
       if(events){
       res.status(200).json(events)
       }
       else{
        res.status(400).json({message:"Events not found"})
       }  
      }) 
  }

 
 catch (err) {
  res.status(500).json({message: "we can't retrieve the events ",error: error})    
  
 }
});
module.exports = router;
