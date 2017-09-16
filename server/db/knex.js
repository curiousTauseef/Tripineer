const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
var knex = require('knex')(config);

module.exports = knex
