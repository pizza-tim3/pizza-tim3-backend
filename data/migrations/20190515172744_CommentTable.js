exports.up = function(knex, Promise) {
    return knex.schema.createTable("comments",function(comments){
           comments.increments();
           comments.string("time").notNullable();
           comments.text("message");
           //foreign keys
           comments.integer("event_id") .references("id").inTable("events");
           comments.integer("user_id").references("id").inTable("users");
       })
   };
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("comments");
};

