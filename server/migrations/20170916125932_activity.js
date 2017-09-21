
exports.up = function(knex, Promise) {
  return knex.schema.createTable('activity', function(table){
    table.increments('id')
    table.varchar('name')
    table.varchar('rating')
    table.varchar('image_url')
    table.integer('trip_id')
      .references('trip.id')
      .onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('activity')
};
