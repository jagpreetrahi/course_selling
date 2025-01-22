const epxress = require('express');
const router = epxress.Router();
const { Course, User } = require('../db/data');
const jwt  = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const userValidate = require('../middlewares/user');




router.post('/signUp' , async (req ,res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username : username,
        password : password
    })

    return res.status(200).json({
        message : "User created Successfully"
    })
})

router.post('/signIn', async(req , res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username,
        password
    })
    if(user){
        const token = jwt.sign({username} , JWT_SECRET);
        res.status(200).json(
            token
        )
    }
    else {
        res.status(403).json({
            message : "Invalid email"
        })
    }
})

router.get('/courses' , userValidate , async (req ,res) => {

    const response = await User.find({});

    return res.status(200).json({
        courses : response
    })
})

router.post('/courses/:courseId' , userValidate ,  (req ,res) => {
   const courseId = req.params.courseId;
   console.log(courseId);
   const username = req.body.username;
   console.log(username);
   

   
     User.updateOne({
        authorization : req.headers.authorization,

        
    } , {
        "$push" : {    // update with adding the purchase course with id
            
            purchaseCourse : {
                courseId
            }
        }
    })
      .then((response) => {
        res.status(200).json({
            message : "Course purchase successfully",
            user : response
         })
      })

    
})

router.get('/purchaseCourse' , userValidate ,async (req , res) => {
    
    const user = await User.find({
        authorization : req.header.authorization
    })

    console.log(user.purchaseCourse);
    const course = await Course.find({
        _id : {
         
             "$in" : user.purchaseCourse
        }
    })

    res.json({
        course : course
    })
})

module.exports = router;
