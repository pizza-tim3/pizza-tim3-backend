exports.up = function(knex, Promise) {
  return knex.schema.createTable("invited", function(invited) {

    invited.increments();
    invited
      .integer("event_id") //declaring a foreign key
      .references("id")
      .inTable("events");

    invited
      .integer("user_id") //declaring the other foreign key
      .references("id")
      .inTable("users");

    invited.bool("pending");
    invited.bool("accepted");
    invited.bool("declined");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("invited");
};
