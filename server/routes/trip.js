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

module.exports = router
