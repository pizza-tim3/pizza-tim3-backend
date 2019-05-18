
exports.up = function(knex, Promise) {
return knex.schema.createTable('links', function(links){
links.increments();
links.integer('event_id')//declaring a foreign key
    .references('id')
    .inTable('events');


links.integer('user_id')//declaring the other foreign key
    .references('id')
    .inTable('users');

links.string("participants").notNullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('links');
  
};



