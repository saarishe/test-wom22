const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.get('/', async (req, res) => {
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
        return res.status('401').send({msg: "No such user....?"})
    }

    const pswMatch = await bcrypt.compare(req.body.password, user.password)
    if(!pswMatch){
        return res.status('401').send({msg: "Wrong password"})

    }

    res.send("Log in succesfull")
})

module.exports = router
