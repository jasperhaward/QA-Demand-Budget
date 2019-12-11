const router = require('express').Router();
const Devs = require ("../models/devs.model")

router.route('/retrieve').get((req,res) => {
    Devs.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    Devs.findById(req.params.id)
      .then(dev=> res.json(dev))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').delete((req, res) => {
    Devs.findByIdAndDelete(req.params.id)
      .then(() => res.json('Person deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/add').post((req, res) => {
        const person = req.body.person;
        const rate = Number(req.body.rate);
        const devRatio = Number(req.body.devRatio);
        const workRatio = Number(req.body.workRatio);

        const newPerson= new Devs({
          person,
          rate,
          devRatio,
          workRatio,
        });
      
        newPerson.save()
        .then(() => res.json('Person added!'))
        .catch(err => res.status(400).json('Error: ' + err));
  
  });

  router.route('/update/:id').post((req, res) => {
    Devs.findById(req.params.id)
      .then(person => {
        person.person = req.body.person;
        person.rate = Number(req.body.rate);
        person.devRatio = Number(req.body.devRatio);
        person.workRatio = Number(req.body.workRatio);
  
        person.save()
          .then(() => res.json('Person updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;