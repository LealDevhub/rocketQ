const express = require('express')
const route = require('./route')
const http = require('http')
const path = require('path')
const server = express()

server.set('view engine', 'ejs')

server.use(express.static('public'))

server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({ extended: true }))

server.use(route)

server.set('port', process.env.PORT || 3000)

http.createServer(server).listen(server.get('port'), () => {
  console.log(`Servidor rodando na porta ${server.get('port')}`)
})
