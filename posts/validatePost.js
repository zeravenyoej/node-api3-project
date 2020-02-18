const validatePost = () => {
    return (req, res, next) => {
        if (!req.body) {
            res.status(400).json({message: "missing post data"})
        } else if (!req.body.text) {
            res.status(400).json({message: "missing required text field"})
        } else {
            next()
        }
    }
}

module.exports = validatePost

/*  
- `validatePost` validates the `body` on a request to create a new post
- if the request `body` is missing, cancel the request and respond with status `400` 
and `{ message: "missing post data" }`
- if the request `body` is missing the required `text` field, 
cancel the request and respond with status `400` and `{ message: "missing required text field" }`
*/


