require('dotenv').config();

const express = require('express')
const route = require('./route')
const path = require('path')
const server = express()

server.set('view engine', 'ejs')

server.use(express.static(path.join(__dirname, '../public')));

server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({ extended: true }))

server.use(route)

server.listen(process.env.PORT || 8080, function () {
  console.log('RODANDO', this.address().port, server.settings.env)
})
