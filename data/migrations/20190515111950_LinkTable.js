
exports.up = function(knex, Promise) {
return knex.schema.createTable('links', function(links){
links.increments();
links.integer('event_id');//declaring a foreign key
links.foreign('event_id')//using the foreign key
    .references('id')
    .inTable('events');


links.integer('user_id');//declaring the other foreign key
links.foreign('user_id')//using this foreign key
    .references('id')
    .inTable('users');

//links.primary(['event_id','user_id'],'id');
links.string("participants").notNullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('links');
  
};



