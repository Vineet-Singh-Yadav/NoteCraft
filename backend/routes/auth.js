import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchUser from "../middleware/fetchUser.js"


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// your routes...
router.post("/createuser",[
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], async (req, res) => {
   let success = false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

  try {
  let user = await User.findOne({email: req.body.email});
  if(user){
    return res.status(400).json({success,error: "Sorry a user with this email already exists"})
  }

  const salt= await bcrypt.genSalt(10);
  const setPass = await bcrypt.hash(req.body.password, salt);

   user = await User.create({
      name : req.body.name,
      password : setPass,
      email : req.body.email,
    })

    const data = {
      user:{
        id : user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success,authtoken});

    } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//login or authenticate a user route
router.post("/login",[
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").exists().withMessage("Password cannot be blank"),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

  const {email, password} = req.body;  

  try {
  let user = await User.findOne({email: req.body.email});
  if(!user){
    let success = false;
    return res.status(400).json({success, error: "Please try to login with correct credentials"});
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if(!passwordCompare){
    success = false;
    return res.status(400).json({success, error: "Please try to login with correct credentials"});
  }

  const data = {
      user:{
        id : user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken});

    }catch(err){
   console.error(err.message);
   res.status(500).send("Internal server error");
}

  });

  //Route to get the user data
  router.post("/getuser",fetchUser, async (req, res) => {
   try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
   }catch(err){
   console.error(err.message);
   res.status(500).send("Internal server error");
   }
  });
  
export default router;