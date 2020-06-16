const express = require('express')
const router = express.Router()
const User = require("../../models/User")
const Idea = require("../../models/Idea")
const isAuthenticated = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');


//@access private
//@req- POST
//@desc- Post a Question

router.post(
    '/',
    [isAuthenticated,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('tag', 'Tag is required').not().isEmpty(),
            check('description', 'description is required').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            console.log(req.user)
            const user = await User.findById(req.user.id||req.user.google.id).select('-password');

            const newIdea = new Idea({
                name: req.body.name,
                tag: req.body.tag,
                description: req.body.description,
                user: req.user.id
            });

            const idea = await newIdea.save();

            res.json(idea);


        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');

        }
    }
)


module.exports = router;
