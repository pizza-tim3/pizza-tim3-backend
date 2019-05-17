const faker = require("faker");

// Create Fake User Functions that returns an object (one user)
const createFakeUser = () => ({
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  // firebase_uid: faker.name.lastName(),
});

exports.seed = async function(knex, Promise) {
  // Create a new array of 500 faker generated users
  let users = [];
  for (let y = 0; y < 5; y++) {
    for (let i = 0; i <= 100; i++) {
      users.push(createFakeUser());
    }
    console.log(users);
    await knex("users").insert(users);
    users = [];
    //return knex("users").insert(users);
    // Insert the array to users table
  }
};
