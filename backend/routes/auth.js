const express = require("express");
// impoting the Schema
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")



const JWT_SECRET = "sadhughiujpojnhbbvhgiuhlhvhhbhywdasdnbhbkjhbkkkkkkkkkkkkkkkkkkkkkdjsabdnbghjbavbndbabmdvbah";

// warna post main [] in k beech main likhna parhta toh clear rahay is liye yahn likh diya aur post main function pass kardiya
const validateUser = [
  body("name", "Name toh string dalo aur khali toh na choro")
    .isString()
    .notEmpty(),
  body("email").isEmail(),
  body("password").isString().notEmpty().isLength({ min: 5 }),
];

// Route 1 Creating User Using Post and making function asynch takay hum jab data base main koi record dalain yeh serach karay toh program wait na karay

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
    // Jwt main phelay hum user ka data detay hain takreeban jesay uski id etc wo cheezain jo unique ho 
    const data = {
      user: {
        id: user.id,
      }
    }
    // ab hum us user ki id waghera ko sign kardetay hain apnay string say 
    const authtoken = jwt.sign(data, JWT_SECRET);

    // res.json(user);
    res.json({authtoken});
  }// agar try run nahi huwa due to error toh catch run hoga aur console main error print karay gah aur response main some error occured kar de gah aur status code  500 set kar de gah jis ka matlab error hota hai
   catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
 // Route 2 Login Authentication matlab user login karay gah is route say
  router.post("/login", [body("email").isEmail(),
                         body('password', 'Password cannot be blank').exists()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, send a response with the errors
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({ error: "Please Enter the correct credential" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({error: "Please Enter the correct credential" });
      }
      const data = {
        user:{
          id: user.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken});

      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
});
 // Route 3 User Detail Fetch hogi uskay jwt token say  matlab user login karay gah is route say
 // aur yahn fetchuser eik middle ware hai matlab hum isko is tarhan jis bhi route main rakhay gy router.post('/getuser',fetchuser , async (req, res) toh yeh us route k execute honay say phelay khud execute hoga aur jesay hi middle ware ka process complete honay k baad end hoga tab hi route main jo function define hai i.e async (req, res) execute hoga
  router.post('/getuser',fetchuser , async (req, res) => {
    try {
      userId = req.user.id;
      // id main say wo id find karo jo userId main hai aur hum kyu k essay find karnay k baad uski koi bhi feild access kar saktay hain toh hum kaha k hum password - kartay hain matlab essa karnay say ab hum password wali feild access nahi kar payein gy
      const user = await User.findById(userId).select("-password")
      res.send(user)

      
    } catch (error) {
      
    }
  })





module.exports = router;
