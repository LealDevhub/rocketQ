const express = require('express')
const server = express()
const route = require('./route')
const path = require('path')

server.set('view engine', 'ejs')

server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({ extended: true }))

server.use(route)

server.use(express.static('public'))

server.listen(3000, () => console.log('RODANDO'))
