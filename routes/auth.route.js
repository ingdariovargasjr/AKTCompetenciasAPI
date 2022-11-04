import express from "express";
import { nuevoUsuario } from "../controllers/auth.controller.js"
import { body } from "express-validator"
import { validacionRegistro } from "../middlewares/validaciones.js";
const router = express.Router()

//rutas
//registro de usuarios
router.post("/nuevo-usuario",
[
    body('email', "Formato de email incorrecto.")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body("password", "Contraseña debe de ser minimo de 6 caracteres y maximo de 10.")
    .trim()
    .isLength({min: 6, max: 10})
    .custom((value, {req}) => {
        if(value !== req.body.confirm){
            throw new Error("Las contraseñas deben coincidir.")
        }
        return value
    }),
],
validacionRegistro,
nuevoUsuario
)

export default router;
