//jNpViqXD4DXmf9H2FbkQnAyoLyu1
exports.seed = function(knex, Promise) {
    return knex('invited').del()
        .then(() => {
            return knex('invited').insert([
            {
               'event_id' : '1', //1
               'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy10000',
               'pending' : 'true',
               'accepted' : 'false',
               'declined' : 'false'
            },
            {
                'event_id' : '1', //2
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy20000',
                'pending' : 'true',
                'accepted' : 'false',
                'declined' : 'false'
            },
             {
                'event_id' : '1', //3
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy30000',
                'pending' : 'false',
                'accepted' : 'true',
                'declined' : 'false'
            },
             {
                'event_id' : '1', //4
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy40000',
                'pending' : 'false',
                'accepted' : 'true',
                'declined' : 'false'
            },
             {
                'event_id' : '1', //5
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy30000',
                'pending' : 'false',
                'accepted' : 'false',
                'declined' : 'true'
            },
             {
                'event_id' : '1', //6
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy40000',
                'pending' : 'false',
                'accepted' : 'false',
                'declined' : 'true'
            },
             {
                'event_id' : '2', //1
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy10000',
                'pending' : 'true',
                'accepted' : 'false',
                'declined' : 'false'
            },
             {
                'event_id' : '2',//2
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy20000',
                'pending' : 'true',
                'accepted' : 'false',
                'declined' : 'false'
            },
            {
                'event_id' : '2',//3
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy30000',
                'pending' : 'false',
                'accepted' : 'true',
                'declined' : 'false'
            },
            {
                'event_id' : '2',//4
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy40000',
                'pending' : 'false',
                'accepted' : 'true',
                'declined' : 'false'
            },
            {
                'event_id' : '2',//5
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy30000',
                'pending' : 'false',
                'accepted' : 'false',
                'declined' : 'true'
            },
            {
                'event_id' : '2',//6
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy40000',
                'pending' : 'false',
                'accepted' : 'false',
                'declined' : 'true'
            },
            {
                'event_id' : '3', //1
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy10000',
                'pending' : 'true',
                'accepted' : 'false',
                'declined' : 'false'
            },
            {
                'event_id' : '3',//2
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy20000',
                'pending' : 'true',
                'accepted' : 'false',
                'declined' : 'false'
            },
            {
                'event_id' : '3',//3
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy30000',
                'pending' : 'false',
                'accepted' : 'true',
                'declined' : 'false'
            },
            {
                'event_id' : '3',//4
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy40000',
                'pending' : 'false',
                'accepted' : 'true',
                'declined' : 'false'
            },
            {
                'event_id' : '3',//5
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy30000',
                'pending' : 'false',
                'accepted' : 'false',
                'declined' : 'true'
            },
            {
                'event_id' : '3',//6
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy40000',
                'pending' : 'false',
                'accepted' : 'false',
                'declined' : 'true'
            },
            {
                'event_id' : '4', //1
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy10000',
                'pending' : 'true',
                'accepted' : 'false',
                'declined' : 'false'
            },
            {
                'event_id' : '4',//2
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy20000',
                'pending' : 'true',
                'accepted' : 'false',
                'declined' : 'false'
            },
            {
                'event_id' : '4',//3
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy30000',
                'pending' : 'false',
                'accepted' : 'true',
                'declined' : 'false'
            },
            {
                'event_id' : '4',//4
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy40000',
                'pending' : 'false',
                'accepted' : 'true',
                'declined' : 'false'
            },
            {
                'event_id' : '4',//5
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy30000',
                'pending' : 'false',
                'accepted' : 'false',
                'declined' : 'true'
            },
            {
                'event_id' : '4',//6
                'user_id' : 'jNpViqXD4DXmf9H2FbkQnAy40000',
                'pending' : 'false',
                'accepted' : 'false',
                'declined' : 'true'
            }
        ]);
    });
};