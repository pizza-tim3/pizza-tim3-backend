const faker = require("faker");
let count = 0;
let fuid = 'jNpViqXD4DXmf9H2FbkQnAy'

// Create Fake User Functions that returns an object (one user)
const createFakeUser = (id) => ({
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  firebase_uid: id,
});

exports.seed = async function(knex, Promise) {
  // Create a new array of 500 faker generated users
  let users = [];
  for (let y = 0; y < 5; y++) {
    for (let i = 0; i <= 100; i++) {
      count = i;
      let countString = count.toString();
      let newFuid = fuid + countString;

      if(newFuid.length > 28) newFuid = newFuid.slice(0, 27);
      if(newFuid.length < 28) newFuid = newFuid.padEnd(28, '0');

      users.push(createFakeUser(newFuid));
    }
    console.log(users);
    await knex("users").insert(users);
    users = [];
    // Insert the array to users table
  }
};
