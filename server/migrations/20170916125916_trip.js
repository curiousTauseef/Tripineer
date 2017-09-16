exports.up = function(knex, Promise) {
  return knex.schema.createTable('trip', function (table){
    table.increments('id')
    table.varchar('location')
    table.date('start_date')
    table.date('end_date')
    table.integer('travel_dist')
    table.boolean('kids')
    table.boolean('entertainment')
    table.boolean('sights')
    table.boolean('food')
    table.boolean('activities')
    table.integer('user_id')
      .references('tripineer_user.id')
        .onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('trip')
};
