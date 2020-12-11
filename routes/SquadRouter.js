const express = require('express');
const router = express.Router();

var {Lesson} = require('../model/Lesson')
var {Squad} = require('../model/Squad')


//Get all squad data
router.route('/squads').get((req,res)=>{
    Squad.find((err,squad)=>{
        if(err)
        {
            res.status(404).send("Error occurred while getting data")
        }
        else
        {
            res.send(squad)
        }
    })
})

//Get squad by id

router.route('/squads/:id').get((req, res) => {
    Squad.findOne({ id: req.params.id }, (err, squad) => {
        if (err) {
            res.status(404).send("error occurred while getting data")
        }
        else {
            if (squad == null) {
                res.status(404).send("This id dont belongs to any lesson")
            }
            else {
                res.send(squad)
            }
        }
    })
})

//post data to squad
router.route('/squads').post((req,res)=>{

    if (req.body.name == "" || req.body.id == "") {
        res.status(404).send("Name/id field can not be empty")
    }
    else
    {
        let squad = new Squad(req.body)
        squad.save()
        .then(squad=>res.send(squad))
        .catch(err=>res.status(404).send("Error occurred"))
    }
})

//Mapping of squad

router.route('/squads/map/:id/:name').post((req,res)=>{
    let lesson , squad
    Lesson.findOne({"_id":req.params.id},(err,data)=>{
        lesson = new Lesson(data)
    })

    Squad.findOne({name:req.params.name},(err,data)=>{
        squad = new Squad(data)
        squad.lessonId.push(lesson)
        squad.save()
        .then(reg=>{res.send(reg)})
        .catch(err=>{res.send("Failed to map",err)})
    })
})

//Update Squad

router.put('/squads/:id', (req, res) => {

    if (req.body.name == "" || req.body.id == "") {
        res.status(404).send("Name/id field can not be empty")
    }
    else {
        var squad = ({
            id: req.body.id,
            name: req.body.name,
            lessonId : req.body.lessonId,
            cohort:req.body.cohort
        })

        Squad.updateOne({ id: req.params.id }, squad, (err, squad) => {
            if (err) {
                res.status(404).send("Some error occurred ! please try after some time")
            }
            else {
                if (squad == null) {
                    res.status(404).send("This id dont belongs to any squad")
                }
                else{
                    res.redirect(`/api/squads/${req.params.id}`)
                }
                }
             
        })
    }
})

//Delete Squad

router.route('/squads/:id').delete((req, res) => {
    Squad.deleteOne({ id: req.params.id }, (err, lesson) => {
        if (err) {
            res.status(404).send("error occurred while deleting data")
        }
        else {
            if (lesson == null) {
                res.status(404).send("This id dont belongs to any squad")
            }
            else {
                res.send(`Lesson with id ${req.params.id} is deleted`)
            }
        }
    })
})


module.exports = router



