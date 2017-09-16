const express = require('express');
const app = express();
const knex= require('knex')
const cors = require('cors')
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')




app.use(function(err,req,res,next){
  res.status(err.status || 500);
res.json({
  message: err.message,
  error: req.app.get('env') === 'development' ? err: {}
})
})
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
module.exports = app;
