const faker = require("faker");

// Create Fake User Functions that returns an object (one user)
const createFakeUser = () => ({
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
});

exports.seed = function(knex, Promise) {
  // Create a new array of 50 faker generated users
  const users = [];
  for (let i = 0; i <= 50; i++) {
    users.push(createFakeUser());
  }

  // Insert the array to users table
  return knex("users").insert(users);
};
