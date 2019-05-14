exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(users) {
    users.increments();
    users
      .text("username", 25)
      .notNullable()
      .unique();
    users
      .text("first_name", 25)
      .notNullable()
      .unique();
    users
      .text("last_name", 25)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
