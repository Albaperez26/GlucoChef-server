const express = require("express")
const router = express.Router()

const Ingredients = require("../models/Ingredients.model")

//Crear un nuevo ingrediente SOLO ADMIN
router.post(("/"), async(req, res, next) => {

    try {
        const response = await Ingredients.create({
            nombre: req.body.nombre,
            establecimiento: req.body.establecimiento,
            hidratos: req.body.hidratos,
            creador: req.body. creador
        })
        res.json(response)
    } catch (error) {
        console.log("error en la ruta crear ingr")
        next(error)
    }
})

//Editar un ingrediente SOLO ADMIN

router.put("/:ingredientsId", async (req, res, next) => {

    try {
        const responseFromDB = await Ingredients.findByIdAndUpdate(req.params.ingredientsId, {
            nombre: req.body.nombre,
            establecimiento: req.body.establecimiento,
            hidratos: req.body.hidratos,
            creador: req.body. creador
        })
        res.json(responseFromDB)
    } catch (error) {
        console.log("error en la ruta de editar ingr.")
        next(error)
    }
})

//Eliminar un ingrediente SOLO ADMIN
//-verificar si existe ingr. en alguna receta, si existe no se puede eliminar

router.delete("/:ingredientsId", async(req, res, next) => {
    try {
        await Ingredients.findByIdAndDelete(req.params.ingredientsId)
        res.send("Ingrediente eliminado correctamente")
    } catch (error) {
        console.log("error en la ruta delete ingr.")
        next(error)
    }
})
module.exports = router