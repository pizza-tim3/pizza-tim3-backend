const faker = require("faker");

const createFakeUser = () => ({
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
});

exports.seed = function(knex, Promise) {
  const users = [];
  for (let i = 0; i <= 50; i++) {
    users.push(createFakeUser());
  }
  return knex("users").insert(users);
};
