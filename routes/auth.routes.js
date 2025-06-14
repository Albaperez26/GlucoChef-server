const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User.model")
const {verifyToken} = require("../middlewares/auth.middleware")

//Comienza la ruta para registrar un usuario
router.post("/signup", async (req, res, next) => {
    console.log(req.body)

    const {email, username, password} = req.body

    if(!username || !email || !password) {
        res.status(400).json({errorMessage: "Todos los campos son obligatorios (username, email, password)"})
        return; //detiene la ejecucion de la ruta
    }
    let regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
    if(regexPassword.test(password) === false) {
        res.status(400).json({errorMessage: "La contraseña no es válida. Debe contener al menos una mayúscula, un número, un caracter especial y una longitud de 8 a 16 dígitos"})
        return;
    }

    try {
        const foundUser = await User.findOne({email: email})

        if(foundUser !== null) {
            res.status(400).json({errorMessage: "Ya existe un usuario con este email"})
            return;
        }

        const hashPassword = await bcrypt.hash(password, 12)
        await User.create({
            email,
            password: hashPassword,
            username
        })

        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        next(error)
    }
})
//comienza la ruta para hacer login
router.post("/login", async(req, res, next) => {
    console.log("todo bien en login")

    const{email, password} = req.body

    if(!email || !password) {
        res.status(400).json({errorMessage: "Todos los campos son obligatorios (email, password)"})
        return;
    }

    try {
        const foundUser = await User.findOne({email:email})

        if(foundUser === null) {
            res.status(400).json({errorMessage: "Usuario no registrado"})
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
        if(isPasswordCorrect === false) {
            res.status(400).json({errorMessage: "La contraseña no es válida"})
            return;
        }

        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
            role:foundUser.role
        }

        const authToken = jwt.sign(payload, process.env.SECRET_TOKEN, {
            algorithm:"HS256",
            expiresIn:"1y"
        })
        res.status(200).json({authToken})
        
    } catch (error) {
        next(error)
    }
})

router.get("/verify", verifyToken, (req, res, next) => {
    res.json({
        payload: req.payload
    })
})

module.exports = router