exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", function(comments) {
    comments.increments();
    comments.string("time").notNullable();
    comments.text("message");
    //foreign keys
    comments
      .integer("event_id")
      .references("id")
      .inTable("events");
    comments.string("user_id"); //declaring the other foreign key
    //   .references("firebase_uid")
    //   .inTable("users");
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("comments");
};
