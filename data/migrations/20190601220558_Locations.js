exports.up = function(knex, Promise) {
  return knex.schema.createTable("locations", locations => {
    locations.increments();
    locations.varchar("google_place_id").notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("locations");
};
