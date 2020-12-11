const express = require('express')
const router = express.Router()
var ObjectId = require('mongoose').Types.ObjectId
var {Lesson} = require('../model/Lesson')

//Get all lessons

router.route('/lessons').get((req,res)=>{
    Lesson.find((err,lesson)=>{
        (err?res.status(404).send("Error occurred while fetching data"):res.send(lesson))
    })
})

//Get lessons by id

router.route('/lessons/:id').get((req,res)=>{
    Lesson.findOne({id:req.params.id},(err,lesson)=>{
        if(err)
        {
            res.status(404).send("error occurred while getting data")
        }
        else
        {
            if(lesson==null)
            {
                res.status(404).send("This id dont belongs to any lesson")
            }
            else
            {
                res.send(lesson)
            }
        }
    })
})

//Post lesson

router.route('/lessons').post((req,res)=>{
    if(req.body.name=="" || req.body.id=="")
    {
        res.status(404).send("Name/id field can not be empty")
    }
    else
    {
        var lesson = new Lesson(req.body)
        lesson.save()
        .then(lesson=>res.send(lesson))
        .catch(err=>res.status(404).send("Error occurred while posting data",err))
    }
})

//Update lesson

// router.route('/lessons/:id').put((req,res)=>{
//     var lesson = ({
//         id = req.body.id,
//         name = req.body.name
//     })

//     Lesson.updateOne({id:req.params.id},lesson,(err,lesson)=>{
//         if(err)
//         {
//             res.status(404).send("Error occured while updating")
//         }
//         else
//         {
//             res.redirect(`/api/lessons/${req.params.id}`)
//         }
//     })
// })

router.put('/lessons/:id',(req,res)=>{

    if (req.body.name == "" || req.body.id == "") {
        res.status(404).send("Name/id field can not be empty")
    }
    else
    {
        var lesson = ({
            id:req.body.id,
            name:req.body.name
        })

        Lesson.updateOne({id:req.params.id},lesson,(err,lesson)=>{
            if(err)
            {
                res.status(404).send("Some error occurred ! please try after some time")
            }
            else
            {
                if(lesson==null)
                {
                    res.status(404).send("This id dont belongs to any lesson")
                }
                else
                {
                    res.redirect(`/api/lessons/${req.params.id}`)
                }
            }
        })
    }
})

//Delete Lesson

router.route('/lessons/:id').delete((req,res)=>{
    Lesson.deleteOne({ id: req.params.id }, (err, lesson) => {
        if (err) {
            res.status(404).send("error occurred while getting data")
        }
        else {
            if (lesson == null) {
                res.status(404).send("This id dont belongs to any lesson")
            }
            else {
                res.send(`Lesson with id ${req.params.id} is deleted`)
            }
        }
    })
})

module.exports = router

