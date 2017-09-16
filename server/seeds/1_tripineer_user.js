
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tripineer_user').del()
    .then(function () {
      // Inserts seed entries
      return knex('tripineer_user').insert([
        { id:1,
          first_name:'Josh',
          last_name:'Saunders',
          username:'jsaunders',
          email:"jsaunders@gmail.com",
        },
        {id:2,
        first_name:'Kyle',
        last_name:'Reubendale',
        username:'KReubendale',
        email:'kreubendale@gmail.com',
      },
        {id:3,
          first_name:'Sam',
          last_name:'Conner',
          username:'SamConner',
          email:'samconner@gmail.com',
        },
      ]);
    });
};
