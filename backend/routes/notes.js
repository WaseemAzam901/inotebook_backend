const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");



// Route 1 fetching all notes of user  /api/notes/fetchallnotes and making function asynch takay hum jab data base main koi record dalain yeh serach karay toh program wait karay
router.get('/fetchallnotes',fetchuser,async (req, res) => {
    const notes = await Note.find({user: req.user.id})
    res.json(notes)
})


// Route 1 fetching all notes of user  /api/notes/fetchallnotes and making function asynch takay hum jab data base main koi record dalain yeh serach karay toh program wait karay
router.get('/fetchallnotes',fetchuser,async (req, res) => {
    try {
        const notes = await Note.find({chooser: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})


const validateNotes = [
    body("title", "Please enter the title with minimum 5 words").isString().isLength({ min: 5 }),
    body("description").isString().isLength({ min: 5 }),
];

// Route 2 Creating Notes /api/notes/createnote and making function asynch takay hum jab data base main koi record dalain yeh serach karay toh program wait karay
router.post('/addnote', fetchuser, validateNotes,async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }
        
        // phelay hum title, description, tag fetch karain gy phir un say 
        const {title, description, tag} = req.body;
         // data base main hum ny jesay auth main data save karwaya hai wesay bhi karwa saktay thay per us method main data direct safe hojata hai lekin is neechay walay method main data safe nahi hota us k liye humain save ki command bhi chalani parhti hai toh agar database main data safe karnay say phelay koi aur task perform karna ho toh ap yeh method use kartay hain baqi sab same hai us main aur is main
            const note =  new Note({
                title,description,tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }

    })


module.exports = router