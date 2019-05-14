exports.up = function(knex, Promise) {
  return knex.schema.createTable("roles", function(roles) {
    roles.increments();
    roles
      .text("name", 25)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("roles");
};
