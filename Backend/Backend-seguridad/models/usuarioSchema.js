const mongoose = require('mongoose')
const usuarioSchema = mongoose.Schema(
    {
        nombre : { 
            type : String,
            require : true,
            trim : true
        },
        correo : {
            type: String,
            require : true,
            trim : true
        },
        contrasena : {
            type: String,
            require : true
        }
    }
)   
module.exports = mongoose.model("user", usuarioSchema )