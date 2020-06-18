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
      //idea.solution.unshift(newSolution);
      await idea.save();

      Idea.findOne({ _id: req.params.id })
        .populate("solution")
        .exec((err, solution) => {
          console.log("The solutions are populated");
          console.log(solution);
        });

      res.json(idea.solution);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@access public
//@req- GET
//@desc- Get solutions to an idea

// router.get("/:id", async (req, res) => {
//   try {
//     //const idea = await Idea.findById(req.params.id);
//     console.log(Idea.findOne({ name: "hello" }));
//   } catch (err) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
