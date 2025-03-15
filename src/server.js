const express = require('express')
const route = require('./src/route.js')
const path = require('path')
const server = express()

server.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '../public')));

server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({ extended: true }))

server.use(route)

server.listen(process.env.PORT || 8080, function () {
  console.log('RODANDO', this.address().port, server.settings.env)
})
