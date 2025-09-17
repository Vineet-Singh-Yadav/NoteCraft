import express from "express";
import fetchUser from "../middleware/fetchUser.js"
import Notes from "../models/Note.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

// your routes...
//Fetch all notes
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
  const notes = await Notes.find({user: req.user.id});//req.user.id come from fetchuser
  res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
   
});

//add notes
router.post("/addnotes", fetchUser,[
  body("title").isLength({ min: 3}).withMessage("Enter a valid title"),
  body("description").isLength({ min: 6 }).withMessage("Description must be at least 6 characters"),
], async (req, res) => {
   const {title, description, tag}= req.body;

   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
    const note = new Notes({
      title, description, tag, user: req.user.id
    })
    const saveNote = await note.save();
    res.json(saveNote );
    } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//To update note
router.put('/updatenote/:id', fetchUser, async(req, res) =>{
  const {title, description, tag} = req.body;


  try {
  //create a newNote obj
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  //fide note and update it
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}

  if(note.user.toString() !== req.user.id){//in notes id is saved in user
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});// new is that set true to any new coming feild which previously not there
  res.json({note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//delete an note
router.delete('/deletenote/:id', fetchUser, async(req, res) =>{
  try {
  //fide note and update it
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}

  if(note.user.toString() !== req.user.id){//in notes id is saved in user
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({"Success": "Note has been deleted", note: note});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

export default router;