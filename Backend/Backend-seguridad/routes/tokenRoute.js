const express = require('express')
const router = express.Router()
const token = require('../controllers/tokenCtrl')
const { check } = require('express-validator')

router.post("/validar", token.tokenValidar  )
module.exports = router