const mongoose = require('mongoose'),Schema = mongoose.Schema

const LessonDetails = new Schema({
    id:Number,
    name:String
})

const Lesson = mongoose.model('lesson',LessonDetails)

module.exports = {Lesson}