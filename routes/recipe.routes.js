const express = require("express")
const router = express.Router()

const Recipe = require("../models/Recipe.model");
const {verifyToken} = require("../middlewares/auth.middleware");
const { verify } = require("jsonwebtoken");
//Crear una nueva receta
router.post(("/create"), verifyToken, async(req, res, next) => {
    try {
        const response = await Recipe.create({
            titulo: req.body.titulo,
            totalHC: req.body.totalHC,
            raciones: req.body.raciones,
            photoURL: req.body.photoURL,
            clasificacion: req.body.clasificacion,
            elaboracion: req.body.elaboracion,
            creador: req.payload._id,
            ingredientes: req.body.ingredientes
        })
        res.json(response)
    } catch (error) {
        console.log("error ruta crear receta");
        next(error);
    }
})

//Ver todas las recetas 
router.get("/", verifyToken, async (req, res, next) => {
    try {
        const response = await Recipe.find({})
        res.json(response)
    } catch (error) {
        console.log("error en la ruta ver recetas")
        next(error)
    }
})

//ver las recetas de un usuario en específico

router.get("/myrecipes", verifyToken, async (req, res, next) => {

    try {
        const response = await Recipe.find({
            creador: req.payload._id
        });
        res.json(response)
    } catch (error) {
        console.log("error en la ruta ver receta de un user")
        next(error)
    }
})

//ruta para ver detalles de una receta

router.get("/myrecipes/:recipesId", verifyToken, async (req, res, next) => {

    try {
        const {recipesId} = req.params;
        const response = await Recipe.findById(recipesId)
        res.json(response)
    } catch (error) {
        console.log("error en la ruta ver detalles de una receta de usuario")
        next(error)
    }
})
//Editar receta

router.put("/myrecipes/:recipesId",verifyToken, async (req, res, next) => {

    try {
        const responseFromDB = await Recipe.findByIdAndUpdate(req.params.recipesId, {
            titulo: req.body.titulo,
            totalHC: req.body.totalHC,
            raciones: req.body.raciones,
            photoURL: req.body.photoURL,
            clasificacion: req.body.clasificacion,
            elaboracion: req.body.elaboracion,
            ingredientes: req.body.ingredientes
    })
    res.json(responseFromDB)
    } catch (error) {
        console.log("error en la ruta editar recetas");
        next(error);
    }
 
})


//Eliminar receta

router.delete("/myrecipes/:recipesId",verifyToken, async (req, res, next) => {
    try {
        await Recipe.findByIdAndDelete(req.params.recipesId)
        res.send("¡Receta eliminada!")
    } catch (error) {
        console.log("error en la ruta delete de recetas")
        next(error)
    }
})





module.exports = router