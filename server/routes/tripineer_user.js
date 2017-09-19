const express = require('express')
const router = express.Router();
const database = require('../db/knex')

router.get('/tripineer_user' ,function(request, response){
  database('tripineer_user')
    .then(function(data){
      response.json(data)
    })
})

router.get('/tripineer_user/:id', function(request, response){
  let id = request.params.id;
  database('tripineer_user').select().where('id', id)
    .then(function(data){
      response.json(data)
    })
})

router.post('/tripineer_user/', function(request, response){
  database('tripineer_user')
    insert(request.body)
    .then(function(data){
      console.log(data);
      response.send("we're da best.")
    })
})

module.exports = router
