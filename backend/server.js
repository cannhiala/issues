require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
var cors = require('cors')
const server = require('http').Server(app)
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let routes = require('./api/routes') //importing route
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

server.listen(port);
//console.log(process.env)
console.log('RESTfull API server started on: ' + port);
console.log('RESTfull API server started on: ' + process.env.PORT);
