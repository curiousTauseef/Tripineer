
exports.up = function(knex, Promise) {
  // return knex.schema.renameTable('user', 'tripineer_user')
  return knex.schema.createTable('tripineer_user', function (table){
    table.increments('id')
    table.varchar('first_name')
    table.varchar('last_name')
    table.varchar('email')
    table.varchar('username')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tripineer_user')
};
