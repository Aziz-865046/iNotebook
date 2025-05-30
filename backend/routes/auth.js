const express = require("express");
const User = require("../models/Users");
const router = express.Router();
// const { query, validationResult } = require("express-validator");
const { body, validationResult } = require("express-validator");

// Create a User using :POST "/api/auth/creatUser". No login required
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
      // Create a new user
      user = User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.json({ user });
    } catch {
      console.log(error.message);
      res.status(500).json({ errors: "Some error occured" });
    }
  }
);

module.exports = router;
