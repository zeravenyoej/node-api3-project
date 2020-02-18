{/*QUESTIONS:
    1. What is a "module", in this context?
    2. So we DON'T need this??? ("const logger = require("logger")") morgan vs logger

*/}


const express = require("express")
const server = express()
const port = 8000
const logger = require('./middleware/logger')


// built in middleware
server.use(express.json()) 
//custom middleware that uses logger
server.use(logger("short"))
// custom middleware in case the route does not exist
server.use((req, res) => {
    res.status(404).json({message: "Route was not found"})
}) 
//error middleware - the alternative to catch
server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({message: "Something went wrong!"})
})



server.listen(port, () => {
    console.log(`magic is happening on ${port}`)
})




