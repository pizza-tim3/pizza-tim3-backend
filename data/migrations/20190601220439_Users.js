exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(users) {
    users.increments();
    users.varchar("email", 255).notNullable();
    users.text("firebase_uid");
    users.text("username", 255);
    users.text("first_name", 255).notNullable();
    users.text("last_name", 255).notNullable();
    users.text("avatar", 2048);
    users.text("crust", 128);
    users.text("topping", 128);
    users.text("slices", 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
