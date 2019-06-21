const faker = require("faker");

// Create Fake User Functions that returns an object (one user)
const createFakeUser = id => ({
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  city: faker.address.city(),
  zipCode: faker.address.zipCode(),
  state: faker.address.state(),
  username: faker.internet.userName(),
  avatar: faker.image.avatar(),
  crust: faker.lorem.word(),
  topping: faker.lorem.word(),
  slices: faker.random.number(),
  firebase_uid: id,
});

const generateFakeFireBaseUID = () => {
  let UID = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  UID = UID.replace(/[-]/g, "");
  return UID.length > 28 ? UID.slice(0, 27) : UID;
};

exports.seed = async function(knex, Promise) {
  // Create a new array of 500 faker generated users
  let users = [];
  for (let y = 0; y < 5; y++) {
    for (let i = 0; i <= 100; i++) {
      count = i;
      let newFuid = generateFakeFireBaseUID();

      users.push(createFakeUser(newFuid));
    }
    console.log(users);
    await knex("users").insert(users);
    users = [];
    // Insert the array to users table
  }

  let hardcodeUsers = [
    {
      email: "test6@gmail.com",
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      state: faker.address.state(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      crust: faker.lorem.word(),
      topping: faker.lorem.word(),
      slices: faker.random.number(),
      firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
    },
    {
      email: "test5@gmail.com",
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      state: faker.address.state(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      crust: faker.lorem.word(),
      topping: faker.lorem.word(),
      slices: faker.random.number(),
      firebase_uid: "T90z5fuhXcWpE231iBvk0WntdKA2",
    },
    {
      email: "test4@gmail.com",
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      state: faker.address.state(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      crust: faker.lorem.word(),
      topping: faker.lorem.word(),
      slices: faker.random.number(),
      firebase_uid: "KmXqNOKhQSWm3RXt20YjD3WkVif2",
    },
    {
      email: "test3@gmail.com",
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      state: faker.address.state(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      crust: faker.lorem.word(),
      topping: faker.lorem.word(),
      slices: faker.random.number(),
      firebase_uid: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2",
    },
    {
      email: "test2@gmail.com",
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      state: faker.address.state(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      crust: faker.lorem.word(),
      topping: faker.lorem.word(),
      slices: faker.random.number(),
      firebase_uid: "RaJMLmDUTWTP870aXFUQ6mLVb1M2",
    },
    {
      email: "test1@gmail.com",
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      state: faker.address.state(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      crust: faker.lorem.word(),
      topping: faker.lorem.word(),
      slices: faker.random.number(),
      firebase_uid: "IyJoCaT4A7cObBoZDEUEKjhwADE2",
    },
    {
      email: "test@gmail.com",
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      state: faker.address.state(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      crust: faker.lorem.word(),
      topping: faker.lorem.word(),
      slices: faker.random.number(),
      firebase_uid: "i2i3UqCe3TbaeXbM1ifzQpsGLRi1",
    },
  ];

  await knex("users").insert(hardcodeUsers);
};
