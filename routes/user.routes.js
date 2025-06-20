const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const { verifyToken } = require("../middlewares/auth.middleware");
//Ir a la página de usuario
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id);
    res.json(response);
  } catch (error) {
    console.log("error en la ruta de ir a la pg user");
    next(error);
  }
});

//Editar la pagina de usuario
router.patch("/edit", verifyToken, async (req, res, next) => {
  try {
    const responseFromDB = await User.findByIdAndUpdate(req.payload._id, {
      username: req.body.username,
      photoURL: req.body.photoURL,
      typeofdiabetes: req.body.typeofdiabetes,
      insulinaxracion: req.body.insulinaxracion,
    });
    console.log(req.body);
    res.json(responseFromDB);
  } catch (error) {
    console.log("Error en la ruta edit user");
    next(error);
  }
});

module.exports = router;
