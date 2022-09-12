//require = att vi använder en modul
const express = require('express')
//inistialisering
const app = express()
const mongoose = require('mongoose')
//portnummer (om inte 3030 finns så hittar den rätta)
const PORT = process.env.PORT || 3030

//import dotenv och läsa in .env-fil
require('dotenv').config()
console.log(process.env.PASS)


//connect to DB
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.on('open', () => console.log('Connected to DB'))

//ta emot json
app.use(express.json())

app.get('/', (req, res)=>{
res.send(`Express says hello!`)
})

const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)


app.listen(PORT, () =>{
    console.log(`Servern lyssnar på porten ${PORT}`)
})