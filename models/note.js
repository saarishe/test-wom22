//ett databas collection

const mongoose = require('mongoose')

//schema hur databasen uppbyggs
const notesSchema = new mongoose.Schema({
    text: String,
    createdBy: {
        type: String,
        require : true
    },
    archived : Boolean 
}, {timestamps: true})

//model
module.exports = mongoose.model('Note', notesSchema)