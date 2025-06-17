const express = require("express")
const router = express.Router()

const Ingredients = require("../models/Ingredients.model")
const {verifyToken, verifyAdmin}  = require("../middlewares/auth.middleware")
const Recipe = require("../models/Recipe.model")

//Crear un nuevo ingrediente SOLO ADMIN
router.post(("/create"), verifyToken, verifyAdmin, async(req, res, next) => {

    try {
        const response = await Ingredients.create({
            nombre: req.body.nombre,
            establecimiento: req.body.establecimiento,
            hidratos: req.body.hidratos,
            creador: req.payload._id
        })
        res.json(response)
    } catch (error) {
        console.log("error en la ruta crear ingr")
        next(error)
    }
})
//ruta para ver TODOS los ingredientes
router.get("/", verifyToken, verifyAdmin, async(req, res, next) => {
    try {
        const response = await Ingredients.find({})
        res.json(response)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//ruta para ver un ingr en especifico
router.get("/:ingredientsId", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await Ingredients.findById(req.params.ingredientsId);
    res.json(response);
  } catch (error) {
    console.log("Error al obtener ingrediente específico:", error);
    next(error);
  }
});

//Editar un ingrediente SOLO ADMIN

router.put("/:ingredientsId",verifyToken, verifyAdmin, async (req, res, next) => {

    try {
        const responseFromDB = await Ingredients.findByIdAndUpdate(req.params.ingredientsId, {
            nombre: req.body.nombre,
            establecimiento: req.body.establecimiento,
            hidratos: req.body.hidratos,
            creador: req.payload._id
        })
        res.json(responseFromDB)
    } catch (error) {
        console.log("error en la ruta de editar ingr.")
        next(error)
    }
})

//Eliminar un ingrediente SOLO ADMIN
//verificar si existe ingr. en alguna receta, si existe no se puede eliminar

router.delete("/:ingredientsId",verifyToken, verifyAdmin, async(req, res, next) => {
    try {

        const {ingredientsId} = req.params;
        const ingExist = await Recipe.exists({Ingredients: ingredientsId});
        if (ingExist) {
            return res.send("No se puede eliminar este ingrediente, está siendo usado en alguna receta.")
        }

        await Ingredients.findByIdAndDelete(req.params.ingredientsId)
        res.send("Ingrediente eliminado correctamente")
    } catch (error) {
        console.log("error en la ruta delete ingr.")
        next(error)
    }
})
module.exports = router