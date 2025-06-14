const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    console.log("ejecutando middleware auth")

    try {
        
        const tokenText = req.headers.authorization
        const token = tokenText.split(" ")[1]

        const payload = jwt.verify(token, process.env.SECRET_TOKEN)
        req.payload = payload

        next();
    } catch (error) {
        res.status(401).json({errorMessage: "El token no existe o no es válido"})
    }
}

module.exports = verifyToken