exports.up = function(knex, Promise) {
  return knex.schema.createTable("friends", function(friends) {
    friends.increments();
    friends.varchar("uid")
    friends.text("friend_uid");
    friends.enum("status", ["pending", "rejected", "accepted"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("friends");
};
