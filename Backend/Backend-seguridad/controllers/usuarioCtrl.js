const usuarioModel = require('../models/usuarioSchema')
const tokenModel = require('../models/tokenSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usuarioSave = async( req,res)=>{
    const { correo, contrasena, nombre } = req.body
    let contrasenaEncrypt;

    //validacion de correo, contraseña y nombre


    //generar una contraseña encriptada
    const salt = 10;
    bcrypt.hash(contrasena, salt, (err, hash) => {
        if (err) {
            return;
        }
        console.log('Hashed password:', hash);
        try{
            const objeto = new usuarioModel({ nombre: nombre, correo : correo, contrasena : hash  })
            objeto.save()
            res.status(200).json("usuario registrado correctamente")
        }catch(err){
            res.status(400).json("error de creacion", err)    
        }
    })
} 

const usuarioLogin = async(req,res) =>{
    console.log("request", req.body)
    const { correo, contrasena } = req.body
    try{
        if(correo == '')
            res.status(400).json( { message:"Nombre de Usuario Incorrecto"})

        if(contrasena == '')
            res.status(400).json( { message:"Contraseña Incorrecta"})
        console.log("correo", correo)
        //validar con la DB
        //consultar el usuario en ldb por el correo
        const usuario = await usuarioModel.findOne({ correo : correo })
        console.log("usuario", usuario)

        //validar la contraseña
        let correcto = false            //12345
        correcto = await bcrypt.compare(contrasena, usuario.contrasena )
                                       //             <-  transforma
        if(!correcto){
            res.status(401).json({ message: "Datos de acceso incorrectos" })
        }else{
            console.log("Acceso concedido")
            payload = {
                user_id : usuario._id,
                user_name : usuario.nombre,
            }
            secretWord  = "palabrasecreta"
            sign = {
                expiresIn : 3600
            } 
            jwt.sign( 
                payload,
                secretWord, 
                sign,
                (err, token) =>{
                    if(err)
                        res.status(401).json({message: "No Autorizado"})

                    //token -> almacenarlo en una tabla o documento
                    tokenRegister(token)
                    res.status(200).json({ token: token, message: "Acceso concedido" })
                }
            )
        }
    }
    catch(err){ res.status(400).json({ message : err})  }
}

async function tokenRegister(token){
    await tokenModel.create({ token : token })
}


module.exports = {
    usuarioSave,
    usuarioLogin
}