const express = require('express');
const db = require('./postDb')
const { validatePostId } = require('../middleware/validate')

const router = express.Router();

router.get('/', (req, res, next) => {
  db.get()
    .then(response=>res.json(response))
    .catch(err=>next(err))
});

router.get('/:id', validatePostId(), (req, res, next) => {
  db.getById(req.params.id)
    .then(response=>res.json(response))
    .catch(err=>next(err))
});

router.delete('/:id', validatePostId(), (req, res, next) => {
  db.remove(req.params.id)
    .then(numDeleted => {
      if(numDeleted === 0) {
        res.status(404).json({message: "post could not be found"})
      } else {
        res.status(200).json({message: "post successfully removed"})
      }
    })
    .catch(err=>next(err))
});

router.put('/:id', validatePostId(), (req, res, next) => {
  db.update(req.params.id, req.body)
    .then(numDeleted => {
      if (numDeleted === 0){
        res.status(404).json({message: "post could not be found"})
      } else {
        res.status(200).json({message: "post successfully updated", updatedPost: req.body})
      }
    })
    .catch(err=>next(err))
});


module.exports = router;
