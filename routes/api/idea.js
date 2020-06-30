const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Idea = require("../../models/Idea");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const sharp = require("sharp");
const url = require("url");

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

//@access public
//@req- get
//@desc- Search for an Idea

router.get("/search", (req, res) => {
  const q = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
  // var q = req.query.name;
  // console.log(q.name);

  //Full text search using $text
  Idea.find(
    {
      $text: {
        $search: q.name,
      },
    },
    {
      // _id: 0,
      _v: 0,
    },
    (err, data) => {
      res.json(data);
    }
  ).limit(10);

  //Partial text search using $text

  //   Idea.find(
  //     {
  //       n: {
  //         $regex: new RegExp(q.name),
  //       },
  //     },
  //     {
  //       _id: 0,
  //       _v: 0,
  //     },
  //     (err, data) => {
  //       res.json(data);
  //     }
  //   ).limit(10);
});

//@access private
//@req- POST
//@desc- Post an Idea

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("tag", "Tag is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newIdea = new Idea({
        name: req.body.name,
        tag: req.body.tag,
        description: req.body.description,
        user: req.user.id,
      });

      const idea = await newIdea.save();

      res.json(idea);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//@access private
//@req- POST
//@desc- Upload image
router.post("/avatar/:id", auth, upload.single("avatar"), async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    const user = await User.findById(req.user.id).select("-password");
    const idea = await Idea.findById(req.params.id);
    idea.avatar = buffer;

    await idea.save();

    res.json(idea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@access private
//@req- get
//@desc- Get specific Idea

router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).send();
    }

    res.send(idea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@access private
//@req- get
//@desc- Get All Ideas

router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find().limit(10);
    res.json(ideas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@access private
//@req- get
//@desc- Delete an Idea
router.delete("/:id", auth, async (req, res) => {
  try {
    const idea = await Idea.findOneAndDelete({ _id: req.params.id });
    console.log(idea);

    if (!idea) {
      return res.status(404).send();
    }
    if (idea.user !== req.user._id) {
      return res.json("User is not authorized to Delete the idea");
    }

    res.json(idea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@access private
//@req- get
//@desc- Update an Idea

router.patch("/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["tag", "name", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const idea = await Idea.findOne({ _id: req.params.id });
    console.log(idea.user);
    console.log(req.user.id);

    if (!idea) {
      return res.status(404).send();
    }
    if (idea.user === req.user._id) {
      return res.json("User is not authorized to Update the idea");
    }

    updates.forEach((update) => (idea[update] = req.body[update]));
    await idea.save();
    res.json(idea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
