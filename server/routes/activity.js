const express = require('express')
const router = express.Router();
const database = require('../db/knex')

router.get('/activity' ,function(request, response){
  database('activity')
    .then(function(data){
      response.json(data)
    })
})

router.get('/activity/:id', function(request, response){
  let id = request.params.id;
  database('activity').select().where('trip_id', id)
    .then(function(data){
      response.json(data)
    })
})

router.post('/activity', function(request, response){
  database('activity')
  .insert(request.body)
  .then(function(data){
    console.log(data);
    response.send("wrong one Josh, dummy")
  })
})

module.exports = router
