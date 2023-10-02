const express = require("express");
// impoting the Schema
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "sadhughiujpojnhbbvhgiuhlhvhhbhywdasdnbhbkjhbkkkkkkkkkkkkkkkkkkkkkdjsabdnbghjbavbndbabmdvbah";

// warna post main [] in k beech main likhna parhta toh clear rahay is liye yahn likh diya aur post main function pass kardiya
const validateUser = [
  body("name", "Name toh string dalo aur khali toh na choro")
    .isString()
    .notEmpty(),
  body("email").isEmail(),
  body("password").isString().notEmpty().isLength({ min: 5 }),
];

// Creating User Using Post and making function asynch takay hum jab data base main koi record dalain yeh serach karay toh program wait na karay

router.post("/createuser", validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, send a response with the errors
    return res.status(400).json({ errors: errors.array() });
  }
  // try aur catch ko use kar rahay hainn takay agar koi error aye toh catch ho jaye
  try {
    // checking whether an email exist in database already aur agar exist karti hai toh naya user nahi banay gah 
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Email Already Exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hashSync(req.body.password, salt);


// yahn per user create ho raha hai asal main 
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    // res.json(user);
    res.json(authtoken);
  }// agar try run nahi huwa due to error toh catch run hoga aur console main error print karay gah aur response main some error occured kar de gah aur status code  500 set kar de gah jis ka matlab error hota hai
   catch (error) {
    console.error(error.message);
    res.status(500).send("some Error Occured");
  }

  // .then(user => res.json(user))

  // .then(user => res.json(user)) // phela user parameter hai
  // .catch(err=> {console.log(err)
  // res.json ({error: 'Please enter a unique value for email'})}) // yahn error key hai object ki aur '' k under likhi wali cheez value

  // res.send(req.body);
  // console.log(req.body);
  // const user = User(req.body);
  // user.save();
  // res.send(req.body);
});

module.exports = router;
