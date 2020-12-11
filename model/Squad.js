const mongoose = require('mongoose'),Schema = mongoose.Schema

const { type } = require('os')
var {Lesson} = require('../model/Lesson')

var SquadDetails = new Schema({
    id:Number,
    name:String,
    lessonId:[{type:Schema.Types.ObjectId,ref:"Lesson"}],
    cohort:String
})

const Squad = mongoose.model('Squad',SquadDetails)

module.exports={Squad}