import mongoose from "mongoose"
const {Schema, model} = mongoose

const usuariosSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, // para que el correo sea unico y para que el nombre del competidor sea unico y no tener duplicados

    },
    password: {
        type: String,
        required: true
    },
    nombreSensei: {
        type: String,
        required: true
    },
    dojo:{
        type: String
    },
    grado: {
        type: String
    }
    
})

export const usuariosAKT = model('usuariosAKT', usuariosSchema)
