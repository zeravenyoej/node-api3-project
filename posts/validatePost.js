module.exports = () => {
    return (req, res, next) => {

    }
}


/*  
- `validatePost` validates the `body` on a request to create a new post
- if the request `body` is missing, cancel the request and respond with status `400` 
and `{ message: "missing post data" }`
- if the request `body` is missing the required `text` field, 
cancel the request and respond with status `400` and `{ message: "missing required text field" }`
*/


