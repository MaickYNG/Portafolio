const tokenModel = require('../models/tokenSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//encontrar toekn en la coleccion de tokens
const tokenValidar =  async (req,res) =>{
    console.log("req.body",req.body)
    // const { token } = req.body
    const token = req.body.headers['Authorization']
    // console.log("token rec", token)
    const tokenObj = await  tokenModel.findOne( { token : token }  )
    console.log("token", tokenObj)
    if(tokenObj)
        res.status(200).json({ "message" : "ok" })
    else
        res.status(401).json({ "message" : "token no valido" })
}


module.exports = {
    tokenValidar
}