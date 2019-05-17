
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events',function(events){
      events.increments();
      events.string("event_name");
      events.string("event_description");
      events.string("event_date").notNullable();
      //foreign keys
      events.integer("organiser").references("id").inTable("users");

      events.integer("place").references("id").inTable("locations");
       
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("events");
};
