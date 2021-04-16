const app = require('express')()
const consign = require('consign')
require('dotenv').config()

consign()
    .include('./config/middleware.js')
    .then('./api/validator.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(process.env.PORT, () => {
    console.log(`Rodando na porta: http://localhost:${process.env.PORT}`)
})