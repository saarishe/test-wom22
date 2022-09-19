const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const authToken = require('../middleware/checkAuth')

router.get('/', authToken, async (req, res) => {
    const users = await User.find()
    res.send(users)
})

//skapa ny användare
router.post('/', async (req, res) => {
    try {
        const hashPsw = await bcrypt.hash(req.body.password, 10)


        const user = new User({
            email: req.body.email,
            password: hashPsw
        })
        const newUser = await user.save()

        res.send(newUser)

    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

//login
router.post('/login', async (req, res) =>{
    const user = await User.findOne({email: req.body.email}).exec()
    if(user == null){
        return res.status(401).send({msg: "No such user....?"})
    }

    const pswMatch = await bcrypt.compare(req.body.password, user.password)
    if(!pswMatch){
        return res.status(401).send({msg: "Wrong password"})

    }
    const token = jwt.sign({
        //id
        sub: user._id,
        email: user.email 
    }, process.env.JWT_SECRET)
    res.send({msg: "Log in succesfull", token: token})
})

module.exports = router
