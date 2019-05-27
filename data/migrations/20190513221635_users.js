exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(users) {
    users.increments();
    users.varchar("email", 25).notNullable();
    users.text("firebase_uid");
    users.text("username", 25);
    users.text("first_name", 25).notNullable();
    users.text("last_name", 25).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
