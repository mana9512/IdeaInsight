const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middleware/auth");
const User = require("../../models/User");
const Solution = require("../../models/Solution");
const { check, validationResult } = require("express-validator");

//@access private
//@req- POST
//@desc- Post a Question

router.post(
  "/",
  [
    isAuthenticated,
    [check("description", "description is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log(req.user);
      const user = await User.findById(
        req.user.id || req.user.google.id
      ).select("-password");

      const newSolution = new Solution({
        description: req.body.description,
        user: req.user.id,
        links: req.user.links,
      });

      const solution = await newSolution.save();

      res.json(idea);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
