exports.up = function(knex, Promise) {
  return knex.schema.createTable("event_participants", function(
    event_participants
  ) {
    event_participants.increments();
    event_participants
      .integer("event_participantsid") //declaring a foreign key
      .references("id")
      .inTable("events");

    event_participants
      .integer("user_id") //declaring the other foreign key
      .references("id")
      .inTable("users");

    event_participants.bool("accepted");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("event_participants");
};
