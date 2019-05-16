
exports.up = function(knex, Promise) {
    return knex.schema.createTable('friends', function(friends){
        friends.increments();
        friends.string('friend_name',128).notNullable();
        //foreign key

        friends.integer('user_id')
           .unsigned()
           .references('id')
           .inTable("users");
           
    })  
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('friends');
};
