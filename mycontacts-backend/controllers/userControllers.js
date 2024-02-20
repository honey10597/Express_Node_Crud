const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = expressAsyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory")
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("Email is already regeistered")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        userName, email, password: hashedPassword
    })
    console.log(newUser, " <= New user regeistered");
    if (newUser) {
        res.status(201).json({ _id: newUser.id, email: newUser.email })
    } else {
        res.status(400).json({ message: "User data is not valid" })
    }
    res.status(201).json({ message: "new user registered" });
})


const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401)
        throw new Error({ message: "All fields are mandatory" })
    }

    const findUser = await User.findOne({ email })

    if (findUser && (await bcrypt.compare(password, findUser.password))) {
        const accesToken = jwt.sign(
            {
                user: {
                    username: findUser.userName,
                    email: findUser.email,
                    id: findUser.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "100min"
            }
        )
        res.status(200).json({ accesToken })
    } else {
        res.status(401)
        throw new Error("Email or password is incorrect")
    }

    res.status(200).json({ message: "login success" })
})


const currentUser = expressAsyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

module.exports = { registerUser, loginUser, currentUser }