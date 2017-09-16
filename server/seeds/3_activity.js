
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('activity').del()
    .then(function () {
      // Inserts seed entries
      return knex('activity').insert([
        {id: 1,
          trip_id: 1,
        },
        {id: 2,
          trip_id: 2,
        },
        {id: 3,
          trip_id: 3,
        },
      ]);
    });
};
