const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Solution = require("../../models/Solution");
const Idea = require("../../models/Idea");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const sharp = require("sharp");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

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
      const idea = await Idea.findById(req.params.id);

      if (!idea) {
        return res.json({ msg: "No such idea repository found!" });
      }

      const newSolution = new Solution({
        description: req.body.description,
        user: req.user.id,
        links: req.body.links,
      });
      await newSolution.save();
      idea.solution.unshift(newSolution);
      await idea.save();

      res.json(newSolution);
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
    await Idea.find({ _id: req.params.id })
      .populate({
        path: "solution",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .exec((err, solu) => {
        if (err) res.status(404).json({ msg: "Solution not found!" });
        res.json(solu[0]);
      });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectID") {
      return res.status(404).json({ msg: "No such idea repository found!" });
    }
    res.status(500).send("Server Error");
  }
});

//@access private
//@req- POST
//@desc- Post a solution image

router.post("/avatar/:id", auth, upload.single("avatar"), async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    const solution = await Solution.findById(req.params.id);
    solution.avatar = buffer;

    await solution.save();

    res.json(solution);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@access private
//@req- DELETE /api/solution/:id/:solution_id
//@desc- Delete a solution
router.delete("/:id/:solution_id", auth, async (req, res) => {
  try {
    await Idea.find({ _id: req.params.id })
      .populate("solution")
      .exec((err, solu) => {
        if (err) {
          res
            .status(404)
            .json({ msg: "Solutions not found for current idea!" });
        }
        const solution = solu[0].solution.find(
          (sol) => sol._id == req.params.solution_id
        );

        // Make sure the solution exists
        if (!solution) {
          return res.status(400).json({ msg: "Solution does not exists" });
        }
        // Check if the user is authoried to delete the solution
        if (solution.user != req.user.id) {
          return res.json("User is not authorized to Delete this solution");
        }

        // Get the index of comment to be removed
        const removeIndex = solu[0].solution
          .map((sol) => sol.user)
          .indexOf(req.user.id);
        solu[0].solution.splice(removeIndex, 1);

        solu[0].save();
        res.json(solu[0].solution);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/solution/comment/:id
// @desc     Adding comment to a solution
// @access   private

router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      console.log(user);
      const solution = await Solution.findById(req.params.id);

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
      };
      solution.comments.unshift(newComment);
      await solution.save();
      res.json(solution.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    DELETE api/solution/comment/:id/:comment_id
// @desc     Delete comment
// @access   private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);

    // Pull out the comment
    const comment = solution.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure the comment exists
    if (!comment) {
      return res.status(400).json({ msg: "Comment does not exists" });
    }

    // Check the user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get the index of comment to be removed
    const removeIndex = solution.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    solution.comments.splice(removeIndex, 1);

    await solution.save();
    res.json(solution.comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
