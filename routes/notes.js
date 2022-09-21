const express = require('express')
const router = express.Router()
const Note = require('../models/note')
const authToken = require('../middleware/checkAuth')


router.get('/', authToken, async (req, res) => {
    try {
        //$ mongoose "not equal" 
        //kolla om url-variabel archived är ture (? if : else)
        const isArchived = (req.query.archived) ? true : { $ne: true }
        const notes = await Note.find({ createdBy: req.authUser.sub, archived: isArchived })
        res.send(notes)
    } catch (error) {
        res.status(500).send({ msg: error.message })

    }

})

router.get('/:id', authToken, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, createdBy: req.authUser.sub })
        if (!note) return res.status(404).send({ msg: "Note not found?" })
        res.send(note)
    } catch (error) {
        res.status(500).send({ msg: error.message })

    }
})

//uppdatera 
router.patch('/:id', authToken, async (req, res) => {
    try {
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.authUser.sub }, //id för note som ska uppdateras
            req.body, //nya texten
            { new: true }) // uppdaterad version
        res.send({ msg: "Note Updated", updatedNote: updatedNote })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

//skicka
router.post('/', authToken, async (req, res) => {
    try {
        // note är en instans av vår Note-model
        const note = new Note({
            text: req.body.text,
            author: req.authUser.sub
        })
        //spara note i DB, ta emot svar i newNote
        const newNote = await note.save()
        res.send({ sparat: newNote })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
    //notes.push(req.body)
    //res.send({ sparat: req.body })
})

//ta bort
router.delete('/:id', authToken, async (req, res) => {
    try {
        const note = await Note.deleteOne(
            {
                _id: req.params.id,
                createdBy: req.authUser.sub
            })
        if (!note) return res.status(404).send({ msg: "Note not found?" })
        res.send(note)
    } catch (error) {
        res.status(500).send({ msg: error.message })

    }
})

module.exports = router
