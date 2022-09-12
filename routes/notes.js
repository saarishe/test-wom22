const express = require('express')
const router = express.Router()

const notes = [
    {text: "Gå hem"},
    {text: "Sov"},
    {text: "Ät"}
]

router.get('/', (req, res) => {
    res.send(notes)
})

router.get('/:id', (req, res) => {
    res.send(notes[req.params.id])
})

//skicka
router.post('/', (req, res) => {
    notes.push(req.body)
    res.send({ sparat: req.body })
})

module.exports = router
