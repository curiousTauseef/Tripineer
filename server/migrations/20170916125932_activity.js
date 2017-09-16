
exports.up = function(knex, Promise) {
  return knex.schema.createTable('activity', function(table){
    table.increments('id')
    table.integer('trip_id')
      .references('trip.id')
      .onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('activity')
};
