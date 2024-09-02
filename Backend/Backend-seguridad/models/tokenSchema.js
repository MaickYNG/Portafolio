const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema(
    {
        token : { 
            type : String,
            require : true,
            trim : true
        }
    }
)   
module.exports = mongoose.model("token", tokenSchema )