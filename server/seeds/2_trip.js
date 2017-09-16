
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trip').del()
    .then(function () {
      // Inserts seed entries
      return knex('trip').insert([
        {id: 1,
          location: "San Diego, CA",
          start_date: '2020-01-01',
          end_date: '2020-01-15',
          travel_dist: 1,
          kids: 'true',
          entertainment: 'true',
          sights: 'true',
          food: 'true',
          activities: 'true',
          user_id: 1
        },
        { id:2,
          location: "New York, NY",
          start_date: '2020-02-01',
          end_date: '2020-02-15',
          travel_dist: 5,
          kids: 'false',
          entertainment: 'false',
          sights: 'false',
          food: 'false',
          activities: 'false',
          user_id: 2,
        },
        {id:3,
        location: "Portland, OR",
        start_date: '2020-03-01',
        end_date: '2020-03-15',
        travel_dist: 10,
        kids: 'true',
        entertainment: 'false',
        sights: 'true',
        food: 'false',
        activities: 'true',
        user_id: 3
      },
      ]);
    });
};
