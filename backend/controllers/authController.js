import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'



export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const hashPassword = await  bcrypt.hash(password,10)
        //check if user already exist //
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message: "User already exists"})
            //Creating new user //
            const newUser = new User({username, email, password: hashPassword})
            await newUser.save()

            res.status(201).json({message: "User successfully created"})
    } catch (error) {
        next(error)
    }

}
export const login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) return res.status(401).json({ message: "Invalid credentials" })
            const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" })

        const age = 1000 * 60 * 60 * 24 * 7;
const userObj = user.toObject();
    delete userObj.password;

        const token = jwt.sign({
            id: user._id,
            isAdmin: true,
             username: user.username,
        email: user.email,
        avatar: user.avatar
        }, process.env.JWT_SECRET_KEY, { expiresIn: age })
        res.cookie("token", token, { httpOnly: true, maxAge: age }).status(200).json(userObj)


    } catch (error) {
        next(error)

    }

}
export const logout = async (req, res, next) => {
    res.clearCookie("token").status(200).json({message: "Logout Successful"})

}