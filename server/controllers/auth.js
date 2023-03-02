import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js" //mongoose model

/* Register User */
//async because we need to call mongoDB
//req is the request body from the front end
//res is what we are gonna be sending back to front end
//express provides these by default
export const register = async(req, res) => {
    try {
        //destructure parameters from req.body
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body 

        //encrypt password
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save()

        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


/* Logging in */
//from /auth/login
export const login = async (req,res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email }) //call to database

        if(!user) return res.status(400).json({ message: "User does not exist." })
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials" })

        const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET)
        delete user.password;
        res.status(200).json({ token, user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}