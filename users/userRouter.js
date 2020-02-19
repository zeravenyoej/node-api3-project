const express = require('express');
const db = require("./userDb");
const postDB = require("../posts/postDb");
const { validateUserId, validateUser, validatePost } = require("../middleware/validate")
const router = express.Router();

router.post('/', validateUser(), (req, res, next) => {
  db.insert(req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res, next) => {
  const newPost = {
    ...req.body,
    user_id: req.params.id
  }
  postDB.insert(newPost)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/', (req, res, next) => {
  db.get()
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/:id', validateUserId(), (req, res, next) => {
  const { id } = req.params
  db.getById(id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  const { id } = req.params
  db.getUserPosts(id)
    .then(response => res.json(response))
    .catch(err => next(err))
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  db.remove(req.params.id)
    .then(numDeleted => {
      if (numDeleted === 0) {
        res.status(404).json({message: "User could not be found"})
      } else {
        res.status(200).json({message: "User successfully removed"})
      }
    })
    .catch(err => next(err))
});

router.put('/:id', validateUserId(), (req, res, next) => {
  db.update(req.params.id, req.body)
    .then(numDeleted => {
      if (numDeleted === 0) {
        res.status(404).json({message: "User could not be found"})
      } else {
        res.status(200).json({
          message: "User successfully updated",
          updatedUser: req.body
        })
      }
    })
    .catch(err => next(err))
});


module.exports = router;
