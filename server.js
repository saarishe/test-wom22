//require = att vi använder en modul
const express = require('express')
//inistialisering
const app = express()
//portnummer (om inte 3030 finns så hittar den rätta)
const PORT = process.env.PORT || 3030
//
const helloRouter = require('./routes/hello.js')


//middleware
const runAlways = (req, res, next) =>{
     res.locals.myVar = 'this is from runAlways'
    //kan lägga if satser if token valid
    console.log(`A request was made to ${req.path}`)
    next()
}

//middelware som körs ibland och kan ge restrictions till paths
const runSometimes = (req, res, next) =>{
    //kan lägga if satser if token valid
    console.log(`sometimes`)
    next()
}

app.use(runAlways)

//lyssna på en get request
// / = rotkatalogen
// pil istället för function
// req = request, res = response
app.get('/', (req, res)=>{
res.send(`Express says hello! ${res.locals.myVar}`)

})

//hello path
//res som json (kan skicka direkt objekt)
app.use('/hello', helloRouter)

//lyssna på server
// call back funktion för att kolla att porten lyssnar
app.listen(PORT, () =>{
    console.log(`Servern lyssnar på porten ${PORT}`)
})