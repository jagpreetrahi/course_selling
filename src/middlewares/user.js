const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')

function userValidate(req,res,next){

    const token = req.headers.authorization;

    const word = token.split(" ");
    const jwt_token = word[1];

    try {
        const decode = jwt.verify(jwt_token , JWT_SECRET);
        if(decode.username){
            next()
        }
        else{
            res.status(403).json({
                message : "User does not exists"
            })
        }
    } catch (error) {
         
        res.json({
            message : error.message
        })
    }
}

module.exports = userValidate;