const {Schema, model} = require("mongoose");

const recipeSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    totalHC: {
        type: Number,
        required: true
    },
    raciones: {
        type:  Number,
        required: true
    },
    photoURL: {
        type: String,
        required: true
    },
    clasificacion: {
        type: String,
        required: true
    },
    elaboracion: {
        type: String,
        required: true
    },
    creador: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ingredientes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ingredientes'
        }
    ]
})

const Recipe = model('Recipe', recipeSchema)
module.exports = Recipe