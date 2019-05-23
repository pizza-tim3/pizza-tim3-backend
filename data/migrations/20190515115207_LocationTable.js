exports.up = function(knex, Promise) {
  return knex.schema.createTable("locations", function(locations) {
    locations.increments();
    locations.integer("google_place_id").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("locations");
};
