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
      const eid = await Events.add(newEvent);
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

router.get("/:id",async (req,res)=>{
 try{
   const id = req.params.id;
   console.log(id);
   const event = await Events.getBy(id);
   console.log(event)
   if(event){
    res.status(200).json({event})
   }else{
     res.status(400).json({message:"Event doesn't exsist"})
   }
   

 }catch(error){
   res.status(500).json({message:"We can't retrieve the event",error})
 }


})

router.put("/:id",async(req,res)=>{
 try{
   const id = req.params.id;
   const event =req.body;
   if(id && event){
     const result =await Events.update(id,event)
     res.status(200).json({result});
   }if(!id){
     res.status(400).json({message:"Event id doesn't exsist"})
   }else{
    res.status(400).json({message:"Event body has issues"})
   }

 }catch(error){
  res.status(500).json({message:"We can't update the event",error})

 }

})

router.delete("/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    if(id){
      console.log(id)
      const result = await Events.remove(id)
      res.status(200).json({result,message:" event successfully removed"})
    }else{
      res.status(400).json({message:"This event id doesn't exist"})

    }


  }catch(error){
     res.status(500).json({message:"We can't delete this event"})
  }

})
module.exports = router;

