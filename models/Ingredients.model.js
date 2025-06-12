const {Schema, model} = require("mongoose")

const ingredientSchema = new Schema ({

    nombre: {
        type: String,
        required: true
    },
    establecimiento: {
        type: String,
        required: true
    },
    hidratos: {
        type: Number,
        required: true
    },
    creador: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Ingredients = model('Ingredients', ingredientSchema)
module.exports = Ingredients