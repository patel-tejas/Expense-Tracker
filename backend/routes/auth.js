const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../controllers/fetchUser');

const JWT_SECRET = 'yeheksecrethai'

// ROUTE 1 CREATE A USER USING POST "/api/auth/createuser". Doesnt require Authorization/login
router.post('/createuser',
    body('name', "Name must be more than or equal to 3 characters").isLength({ min: 3 }),
    body('email', "Enter valid email").isEmail(),
    body('password', "Password must be of more than 5 characters").isLength({ min: 5 }),
    async (req, res) => {
        let success = false;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //  Checking user has unique email address
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ success, error: "Email already exists" })
            }

            const salt = await bcrypt.genSalt(10);
            secured_pass = await bcrypt.hash(req.body.password, salt)
            // create a new user 
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secured_pass,
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const auth_token = jwt.sign(data, JWT_SECRET)
            res.json({ success: true, auth_token })
        } catch (error) {
            console.log(error.message);
            res.status(400).send("Internal Server error")
        }
    })
// ROUTE 2 Authenticate A USER USING POST "/api/auth/login". Doesnt require Authorization/login
router.post('/login',
    body('email', "Enter valid email").isEmail(),
    body('password', "Password cannot be blanked").exists(),
    async (req, res) => {
        let success = false;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })
            }

            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })
            }

            const token_given = {
                user: {
                    id: user.id
                }
            }
            const auth_token = jwt.sign(token_given, JWT_SECRET)
            success = true;
            res.json({ success, auth_token })
        } catch (error) {
            console.log(error.message);
            res.status(400).send("Internal Server error")
        }
    }
)
// ROUTE 3 Get LoggedIn User details USING POST "/api/auth/getuser". REQUIRE Authorization/login
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(400).send("Internal Server error")
    }
}
)
module.exports = router