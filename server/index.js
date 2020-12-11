require('../config/mongoose')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var server = express()
var lesson = require('../routes/LessonRouter')
var squad = require('../routes/SquadRouter')


server.use(bodyParser.json())
server.use(cors({origin:'*'}))

server.listen(3000,()=>console.log("Server Started at 3000 port"))

server.use('/api',lesson)
server.use('/api',squad)
