const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Solution = require("../../models/Solution");
const Idea = require("../../models/Idea");
const { check, validationResult } = require("express-validator");

//@access private
//@req- POST
//@desc- Adding a solution to an idea

router.post(
  "/:id",
  [auth, [check("description", "description is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const idea = await Idea.findById(req.params.id);
      // console.log(req.params.id);

      const newSolution = new Solution({
        description: req.body.description,
        user: req.user.id,
        links: req.body.links,
      });
      await newSolution.save();
      idea.solution.unshift(newSolution);
      await idea.save();

      res.json(idea.solution);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@access public
//@req- GET
//@desc- Get all solutions to an idea

router.get("/:id", async (req, res) => {
  try {
    let foundIdea = await Idea.find({ _id: req.params.id }).populate(
      "solution"
    );
    res.json(foundIdea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
