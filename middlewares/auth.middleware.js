const jwt = require("jsonwebtoken")
//verifica que el token sea válido
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

//funcion verifica que el user sea admin

function verifyAdmin(req, res, next) {
    if(req.payload.role === "admin") {
        next()//continua con la ruta
    }
    else {
        res.status(401).json({errorMessage:"Este usuario no es admin"})
    }
}

module.exports = {
    verifyToken,
    verifyAdmin
}