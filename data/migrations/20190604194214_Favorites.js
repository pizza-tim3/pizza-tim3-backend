exports.up = function(knex, Promise) {
  return knex.schema.createTable("favorites", function(favorites) {
    favorites.increments();
    favorites.text("firebase_uid"); //user's id
    favorites
      .integer("location_id")
      .references("id")
      .inTable("locations");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("favorites");
};
