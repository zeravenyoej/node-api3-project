{/*QUESTIONS:
DONE 1. What is a "module", in this context?
DONE 2. So we DON'T need this??? ("const logger = require("logger")") morgan vs logger
DONE 3. Did I organize my validation middleware in a way that makes sense?
DONE 4. What's going on with the data schema section in the READMe?
DONE 5. to make sure: I don't need to import the router files BECAUSE I don't have a shortcut url for them?
DONE 6. How do you test the routes when there's multiple get requests, for example?
DONE 7. What does the third MVP requirement mean?
DONE 8. QUERY STRINGS
DONE 9. In userRouter, how do the post requests differ from one another?
*/}


const express = require("express")
const server = express()
const port = 8000
const logger = require('./middleware/logger')
const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter");



server.use(express.json()) 
server.use(logger("short"))
//welcome route
server.get('/', (req, res) => {
    res.send("<h1>Welcome</h1><h2>Try 'posts' and 'users' routes</h2>")
})
server.use("/posts", postRouter)
server.use("/users", userRouter)
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




