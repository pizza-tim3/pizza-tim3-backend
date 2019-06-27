exports.up = function(knex, Promise) {
  return knex.schema.createTable("events", function(events) {
    events.increments();
    events.string("event_name");
    events.string("event_description");
    events.bigInteger("event_date").notNullable();
    //foreign keys
    events.string("organizer");
    //   .references("firebase_uid")
    //   .inTable("users");
    events.bool("inviteOnly");

    events
      .varchar("place")
      .references("google_place_id")
      .inTable("locations")
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("events");
};
