const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fatchuser = require("../middleware/fetchuser");

const JWT_SECRET = "aizk";

// const { query, validationResult } = require("express-validator");
const { body, validationResult } = require("express-validator");

// Route 1 :Create a User using :POST "/api/auth/creatUser". No login required
router.post(
  "/creatUser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Mail").isEmail(),
    body("password", "Password must be atlest 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are error, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors });
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ errors: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSaltSync(10);
      secPass = await bcrypt.hashSync(req.body.password, salt);
      // Create a new user
      user = User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: { id: user.id },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      // res.json({ user });

      res.json({ authToken });
    } catch {
      console.log(error.message);
      res.status(500).json({ errors: "Some error occured" });
    }
  }
);

// Route 2 : Authentication a User using :POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a Valid Mail").isEmail(),
    body("password", "Password cann't be blank").exists(),
  ],
  async (req, res) => {
    // If there are error, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors });
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: { id: user.id },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ errors: "Internal server error" });
    }
  }
);

// Route 3 : Get loggedin User details using :POST "/api/auth/getuser".  login required
router.post("/getuser", fatchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: "Internal server error" });
  }
});
module.exports = router;
