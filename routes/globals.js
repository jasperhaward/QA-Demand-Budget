const router = require('express').Router();
const Globals = require ("../models/globals.model")

router.route('/retrieve').get((req,res) => {
    Globals.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    Globals.findById(req.params.id)
      .then(global=> res.json(global))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Globals.findById(req.params.id)
      .then(global=> {
        global.name = req.body.name;
        global.value = Number(req.body.value);
  
        global.save()
          .then(() => res.json('Global updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;