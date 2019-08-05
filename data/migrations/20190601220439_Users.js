exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(users) {
    users.increments();
    users.varchar("email", 255).notNullable();
    users.text("firebase_uid");
    users.text("username", 255);
    users.text("city", 255);
    users.text("zipCode", 5);
    users.text("state", 2);
    users.text("first_name", 255).notNullable();
    users.text("last_name", 255).notNullable();
    users.text("avatar", 2048);
    users.varchar("friend_id", 255)
      .references("uid")
      .inTable("friends")
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
