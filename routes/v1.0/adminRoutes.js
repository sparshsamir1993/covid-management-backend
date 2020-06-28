var router = require("express").Router();
var Question = require('../../models/Question');
var QAnswerOptions = require('../../models/QAnswerOptions');

//var models = require("../../models");



router.get("/questions",async (req,res)=>{

   
    const questions = await Question.findAll().then((questions)=>{

        res.status(200).send(questions);
    }).catch((error)=>{
        res.send(error)
    });
});

router.get("/questions/options",async(req,res)=> {
    const check = await QAnswerOptions.findAll({
         where: { 
            questionId:1 
         },
        include:[{
            model: Question,
            required: true
        }]

    }).then((questions)=>{
        res.send(questions)
        console.log(questions)

    }).catch((error)=>{res.send(error)});
 
    //res.send(check);
});




router.post("/questions", async (req,res)=>{
    let text = req.body.question
    const myquestion = await Question.create({question:text})
    console.log(text);
     res.send(text);  
}); 



router.get("/questions/:id", async(req,res) => {
     let questionid = req.params.id
     const myquestion = await Question.findAll({where:{id:questionid}}).then((myquestion)=>{
        res.status(200).send(myquestion)  
     }).catch((error)=>{
         res.status(403).send(error)
     });   
});


router.put("/questions/:id", async(req,res)=> {
    let questionid = req.params.id
    const myquestion = await Question.update({question:req.body.question},{where:{id:questionid}}).then((myquestion)=>{
        res.status(200).send(myquestion)
    }).catch((error)=>{
        res.sendStatus(403).send(error)
    })  
});

router.delete("/questions/:id", async(req,res)=> {
    let questionid = req.params.id
    const requestId = await Question.destroy({where:{
        id:questionid
    }}).then((requestCode)=>{
        res.sendStatus(200).send(requestCode)
    }).catch((error=>{
        res.sendStatus(403).send(error)
    }));
   // res.send(requestId)
    //console.log(requestId)
});






router.post("/questions/options",async(req,res)=> {
    let option1 = req.body.option1
    let option2 = req.body.option2
    let questionId = req.body.questionId
    const myquestion = await QAnswerOptions.create({option1:option1,option2:option2,questionId:questionId});
    res.send(option2)
    console.log(myquestion)
});


module.exports = router