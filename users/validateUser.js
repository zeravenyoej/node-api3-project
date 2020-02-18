const db = require("./userDb")

const validateUser = () => {
    return (req, res, next) => {
        if (!req.body) {
            res.status(400).json({message: "missing user data"})
        } else if (!req.body.name) {
            res.status(400).json({message: "Missing required name field"})
        } else {
            next()
        }
    }
}

module.exports = validateUser

/*- `validateUser` validates the `body` on a request to create a new user
- if the request `body` is missing, cancel the request and respond with status `400` 
and `{ message: "missing user data" }`
- if the request `body` is missing the required `name` field, 
cancel the request and respond with status `400` and `{ message: "missing required name field" }`
*/