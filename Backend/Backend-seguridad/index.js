const express = require('express')
const app = express()
const puerto = 3001
const db = require('./config/db')
app.use(express.json())
app.use("/api/users",require('./routes/usuariosRoute'))
app.use("/api/tokens", require('./routes/tokenRoute'))

app.listen(puerto, ()=>{ console.log("Servidor Express Seguridad Activo, puerto :", puerto) })
db()