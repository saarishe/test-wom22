const express = require('express')
const router = express.Router()
const Note = require('../models/note')
const authToken = require('../middleware/checkAuth')


router.get('/',authToken, async(req, res) => {
    try {
        const notes = await Note.find()
        res.send(notes)
    } catch (error){
        res.status(500).send({ msg: error.message })

    }

})

router.get('/:id',authToken, async(req, res) => {
    try {
        const note = await Note.findOne({_id: req.params.id})
        if(!note) return res.status(404).send({msg: "Note not found?"})
        res.send(note)
    } catch (error){
        res.status(500).send({ msg: error.message })

    }
})

//skicka
router.post('/', authToken,async (req, res) => {
    try {
        // note är en instans av vår Note-model
        const note = new Note({
            text: req.body.text
        })
        //spara note i DB, ta emot svar i newNote
        const newNote = await note.save()
        res.send({ sparat: newNote })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
    notes.push(req.body)
    res.send({ sparat: req.body })
})

module.exports = router
