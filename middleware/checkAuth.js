require.apply('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=> {
    console.log('authToken')
    try{
        const authHeader = req.headers['authorization']
        const token = authHeader.split(' ')[1]
        const jwtBody = jwt.verify(token, process.env.JWT_SECRET)
        console.log('Token authorized')

    }catch(error){
        console.log(error.message)
        return res.status(401).send({msg: "Authorization failde", error: error.message})
    }
    
    next()
}