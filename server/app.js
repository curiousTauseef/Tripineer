const express = require('express');
const app = express();
const knex= require('knex')
const cors = require('cors')
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

var activity = require('./routes/activity')
var trip = require('./routes/trip')
var tripineer_user = require('./routes/tripineer_user')


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(activity)
app.use(trip)
app.use(tripineer_user)


app.use(function(err,req,res,next){
  res.status(err.status || 500);
res.json({
  message: err.message,
  error: req.app.get('env') === 'development' ? err: {}
})
})
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
module.exports = app;
