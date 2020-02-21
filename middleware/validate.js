const db = require("../users/userDb")
const postsDB = require("../posts/postDb")

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


const validateUserId = () => {
    return (req, res, next) => {
		const { id } = req.params
		db.getById(id)
			.then(user => {
				if (user) {
					req.user = user
					next()
				} else {
					res.status(400).json({message: "Invalid user id"})
				}
			})
			.catch(error => {
				next(error)
			})
    }
}



const validatePostId = () => {
    return (req, res, next) => {
        const { id } = req.params
        postsDB.getById(id)
            .then(post => {
                if (post) {
                    req.post = post
                    next()
                } else (
                    res.status(400).json({message: "Invalid post ID"})
                )
            })
            .catch(error =>
                next(error))
    }
}

module.exports = {
    validatePost, 
    validateUser,
    validateUserId,
    validatePostId
}


/*  
- `validatePost` validates the `body` on a request to create a new post
- if the request `body` is missing, cancel the request and respond with status `400` 
and `{ message: "missing post data" }`
- if the request `body` is missing the required `text` field, 
cancel the request and respond with status `400` and `{ message: "missing required text field" }`
*/



/*- `validateUser` validates the `body` on a request to create a new user
- if the request `body` is missing, cancel the request and respond with status `400` 
and `{ message: "missing user data" }`
- if the request `body` is missing the required `name` field, 
cancel the request and respond with status `400` and `{ message: "missing required name field" }`
*/