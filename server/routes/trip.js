const express = require('express')
const router = express.Router();
const database = require('../db/knex')

router.get('/trip' ,function(request, response){
  database('trip')
    .then(function(data){
      response.json(data)
    })
})

router.get('/trip/:id', function(request, response){
  let id = request.params.id;
  database('trip').select().where('id', id)
    .then(function(data){
      response.json(data)
    })
})

router.post('/trip', function(request, response){
  database('trip')
  .insert(request.body)
  .then(function(data){
    console.log(data);
    response.send("travelling yay!")
  })
})

module.exports = router
