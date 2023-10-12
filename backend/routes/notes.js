const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");



// // Route 1 fetching all notes of user  /api/notes/fetchallnotes and making function asynch takay hum jab data base main koi record dalain yeh serach karay toh program wait karay
// router.get('/fetchallnotes',fetchuser,async (req, res) => {
//     const notes = await Note.find({user: req.user.id})
//     res.json(notes)
// })


// Route 1 fetching all notes of user  /api/notes/fetchallnotes and making function asynch takay hum jab data base main koi record dalain yeh serach karay toh program wait karay
router.get('/fetchallnotes',fetchuser,async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id})
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
// Route 3 Updating a Note /api/notes/updatenote and making function asynch takay hum jab data base main koi record dalain yeh serach karay toh program wait karay
// Kuch bhi update karnay k liye hum put request kartay hain 
router.put('/updatenote/:id', fetchuser,async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array() });
            }
            const { title, description, tag } = req.body;
            // toh neechay wali 4 line main sab say phelay hum ny eik khali object banaya ab uskay neechay wali line main hum bol rahay hain agar user title bhej raha hai body main req ki toh newNote main eik key banao title jis ko value dedo request main aye title ki toh jo cheezain mil gayi ussay hum newNote object main daal dein gy and for example humain tag nahi milta request ki body main toh hum newNote ki body main bhi nahi dalain gy tag ko
            const newNote = {};
            if(title){newNote.title = title}; 
            if(description){newNote.description = description};
            if(tag){newNote.tag = tag};

            // find the note to be updated and update it means hum id lain gy user ki from request and phir hum ussay data base main find karen gy  
            // yahn req.params.id main id aye gi put request k baad wali jagah say yeni /updatenote/:id yahn say
            let note = await Note.findById(req.params.id);
            if(!note){return res.status(404).send("Not Found")}
            // ab hum check kar rahay hain k jo user hai uski id jo k header main jwt sy milli hai aur jo notes main safe user ki id hai wo dono same hai yeh nahi matlab agar user kissi note ko modify karna chahay toh hum dekhain gy k header main milli id aur notes main milli id same hui toh hi hum further process main jayein gy warna error aur ap dekhain gy toh ap ko notes k database main userid milay gi 
            // matlab inshort ap ko request aye gi us main id hogi note ki wo id ap ko kahay gi yeh wohi id hogi jissay modify karna hoga inshort wo bolay gi mujhe note modify karna hai aur jo note modify karna hai uski id hi ap ko send ki gayi hai ab ap dekho gy k jwt k token ki id jo k actually user ki id hai wo id aur note main jo hum ny foreign key say bheji hai id batanay k liye k yeh note kis ko belong karta hai agar wo same hui toh hi ap allow karo gy modify karna
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed")
            }
            note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
            res.json(note);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
          }
    })


    // Route 4 Deleting a Note /api/notes/deletenote and making function asynch takay hum jab data base main koi record dalain yeh serach karay toh program wait karay
// Kuch bhi delete karnay k liye hum delete request kartay hain 
router.delete('/deletenote/:id', fetchuser,async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }
        const { title, description, tag } = req.body;
        // toh neechay wali 4 line main sab say phelay hum ny eik khali object banaya ab uskay neechay wali line main hum bol rahay hain agar user title bhej raha hai body main req ki toh newNote main eik key banao title jis ko value dedo request main aye title ki toh jo cheezain mil gayi ussay hum newNote object main daal dein gy and for example humain tag nahi milta request ki body main toh hum newNote ki body main bhi nahi dalain gy tag ko

        // find the note to be updated and update it means hum id lain gy user ki from request and phir hum ussay data base main find karen gy  
        // yahn req.params.id main id aye gi put request k baad wali jagah say yeni /updatenote/:id yahn say
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        // ab hum check kar rahay hain k jo user hai uski id jo k header main jwt sy milli hai aur jo notes main safe user ki id hai wo dono same hai yeh nahi matlab agar user kissi note ko modify karna chahay toh hum dekhain gy k header main milli id aur notes main milli id same hui toh hi hum further process main jayein gy warna error aur ap dekhain gy toh ap ko notes k database main userid milay gi 
        // matlab inshort ap ko request aye gi us main id hogi note ki wo id ap ko kahay gi yeh wohi id hogi jissay modify karna hoga inshort wo bolay gi mujhe note modify karna hai aur jo note modify karna hai uski id hi ap ko send ki gayi hai ab ap dekho gy k jwt k token ki id jo k actually user ki id hai wo id aur note main jo hum ny foreign key say bheji hai id batanay k liye k yeh note kis ko belong karta hai agar wo same hui toh hi ap allow karo gy modify karna
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "Yes Its Deleted",note});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})


module.exports = router