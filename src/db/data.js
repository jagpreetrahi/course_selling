const mongoose = require('mongoose');

//connect with the mongodb via url
mongoose.connect('mongodb://localhost:27017/course_selling_2?appName=MongoDB+Compass&directConnection=true&serverSelectionTimeoutMS=2000')
.then(() => {
    console.log("MongoDb connected successfully")
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
});


// admin Schema = 

const adminSchema = new mongoose.Schema({

       username : String,
       password : String
})

const userSchema  = new mongoose.Schema({

    username : String,
    password : String,
    purchaseCourse : [{
        type  : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]

})

const courseSchema = new mongoose.Schema({

    title : String,
    description : String,
    price : Number
})


const Admin = mongoose.model('Admin' , adminSchema);
const User = mongoose.model('User' , userSchema);
const Course = mongoose.model('Course' , courseSchema);


module.exports = {
    Admin,
    User,
    Course
}