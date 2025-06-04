const express = require("express");
const router = express.Router();
const fatchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1 :Get all Notes using :get "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fatchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2 :Add a new Notes using :post "/api/notes/addnote". login required
router.post(
  "/addnote",
  fatchuser,
  [
    body("title", "Enter a Valid title").isLength({ min: 3 }),
    body("description", "Password must be atlest 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // If there are error, return bad request and the error
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3 :Update an existing Notes using :put "/api/notes/updatenote". login required
router.put("/updatenote/:id", fatchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // Create a newNote object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // Find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});
// Route 4 :Delete an existing Notes using :delete "/api/notes/deletenote". login required
router.delete("/deletenote/:id", fatchuser, async (req, res) => {
  try {
    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ sucess: "Note has been delete", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
