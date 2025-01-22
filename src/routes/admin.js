const express = require('express');
const router = express.Router();
const {JWT_SECRET} = require('../config')
const { Admin, Course } = require('../db/data');
const validateAdmin = require('../middlewares/admin')
const jwt = require('jsonwebtoken')


router.post('/signUp' , async (req, res) => {
   const username = req.body.username;
   const password = req.body.password;

   try {
        const admin = await Admin.create({
            username,
            password
         })
         res.status(200).json({
            message : "Admin created Successfully",
            admin
         })
         
   } catch (error) {
        res.json({
         message : error.message
        })
   }
   
   
})

router.post('/signIn' , async(req , res) => {

   const username = req.body.username;
   const password  = req.body.password;
   
    const admin = await Admin.findOne({
       username,
       password
   })
   console.log(admin)
   if(admin){
       const token = jwt.sign({username} , JWT_SECRET);
       res.status(200).json({
          token
       })
   }
   else{
      res.status(403).json({
         message : "Invalid email"
      })
   }

})

router.post('/courses', validateAdmin ,  async(req, res) => {

   const title = req.body.title;
   const description = req.body.description;
   const price = req.body.price;


   const response = await Course.create({
      title,
      description,
      price
   })
   res.json({
      message : "Course created Successfully",
      courseId : response._id

   })
})

router.get('/courses' ,validateAdmin , async(req , res) => {

   const response = await Course.find({});

   res.status(200).json({
      course  : response  
   })
})


module.exports = router;