const mongoose = require('mongoose')
const URIDB ="mongodb+srv://maicolamerica12:123!@cluster0.q6e47.mongodb.net/portafolio?retryWrites=true&w=majority";

const connectDB = async() =>{
    try{
        await mongoose.connect(URIDB)
        console.log("conexion satisfactoria")
    }catch(err){
        console.log("Error de Conexion", err)
    }
}

module.exports = connectDB 