const express = require('express')
const router = express.Router()
const controller = require('../controllers/usuariasController')

router.post('creat', controller.create)
//router.post('/login', controller.login)

module.exports = router