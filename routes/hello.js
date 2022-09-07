// allt som skall hända i path /hello
const express = require('express')
const router = express.Router()


//hello path
//res som json (kan skicka direkt objekt)
app.get('/', (req, res)=>{
    res.json({title : 'User'})

})

module.exports = router