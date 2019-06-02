//jNpViqXD4DXmf9H2FbkQnAyoLyu1
exports.seed = function(knex, Promise) {
    return knex('invited').del()
        .then(() => {
            return knex('invited').insert([
               {
                   'event_id' : '5',
                   'user_id' : 'jNpViqXD4DXmf9H2FbkQnAyoLyu2',
                   'pending' : 'true',
                   'accepted' : 'false',
                   'declined' : 'false'
               },
               {
                'event_id' : '6',
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAyoLyu2',
                'pending' : 'true',
                'accepted' : 'false',
                'declined' : 'false'
            }

            ]);
        });
};