
exports.up = function(knex, Promise) {
    return knex.schema.createTable("locations", function(locations) {
        locations.increments();
        locations
          .string("location_name").notNullable();
         
        locations.integer("google_place_id").notNullable();
        locations.float("latitude",2).notNullable();
        locations.float("longitude",2).notNullable();
      });
    };
    
    exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists("users");
    };
    