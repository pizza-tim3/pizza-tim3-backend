exports.up = function(knex, Promise) {
  return knex.schema.createTable("invited", function(invited) {
    invited.increments();
    invited
      .integer("event_id") //declaring a foreign key
      .references("id")
      .inTable("events")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")

    invited.string("user_id"); //declaring the other foreign key
    //   .references("firebase_uid")
    //   .inTable("users");

    invited.bool("pending");
    invited.bool("accepted");
    invited.bool("declined");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("invited");
};
