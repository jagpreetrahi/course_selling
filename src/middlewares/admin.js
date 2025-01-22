const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')
function validateAdmin(req , res ,next){

    //header 
    const token = req.headers.authorization
    

    //auth logic
    const word = token.split(" ");
    
    const jwtToken = word[1];
   
    
    try {
        const decode = jwt.verify(jwtToken , JWT_SECRET);
        if(decode.username){
            next();
        }
        else{
            res.status(403).json({
                message : "Admin does not exist"
            })
        }
    } catch (error) {
          res.status(500).json({
            message  : error.message
          })
    }
    
}

module.exports = validateAdmin;