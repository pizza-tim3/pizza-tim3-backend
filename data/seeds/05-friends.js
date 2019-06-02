exports.seed = function(knex, Promise) {
    return knex('friends').del()
        .then(() => {
            return knex('friends').insert([
                {
                    'user_uid' : 'jNpViqXD4DXmf9H2FbkQnAy00000',
                    'friend_uid' : 'jNpViqXD4DXmf9H2FbkQnAy10000',
                    'status' : 'pending'
                },
                {
                    'user_uid' : 'jNpViqXD4DXmf9H2FbkQnAy00000',
                    'friend_uid' : 'jNpViqXD4DXmf9H2FbkQnAy30000',
                    'status' : 'pending'
                },
                {
                    'user_uid' : 'jNpViqXD4DXmf9H2FbkQnAy00000',
                    'friend_uid' : 'jNpViqXD4DXmf9H2FbkQnAy40000',
                    'status' : 'pending'
                },
                {
                    'user_uid' : 'jNpViqXD4DXmf9H2FbkQnAy00000',
                    'friend_uid' : 'jNpViqXD4DXmf9H2FbkQnAy50000',
                    'status' : 'pending'
                },
                {
                    'user_uid' : 'jNpViqXD4DXmf9H2FbkQnAy00000',
                    'friend_uid' : 'jNpViqXD4DXmf9H2FbkQnAy60000',
                    'status' : 'accepted'
                },
                {
                    'user_uid' : 'jNpViqXD4DXmf9H2FbkQnAy00000',
                    'friend_uid' : 'jNpViqXD4DXmf9H2FbkQnAy70000',
                    'status' : 'accepted'
                },
                {
                    'user_uid' : 'jNpViqXD4DXmf9H2FbkQnAy00000',
                    'friend_uid' : 'jNpViqXD4DXmf9H2FbkQnAy80000',
                    'status' : 'accepted'
                },
                {
                    'user_uid' : 'jNpViqXD4DXmf9H2FbkQnAy00000',
                    'friend_uid' : 'jNpViqXD4DXmf9H2FbkQnAy90000',
                    'status' : 'accepted'
                },
                {
                    'user_uid' : 'jNpViqXD4DXmf9H2FbkQnAy00000',
                    'friend_uid' : 'jNpViqXD4DXmf9H2FbkQnAy34000',
                    'status' : 'rejected'
                },
                {
                    'user_uid' : 'jNpViqXD4DXmf9H2FbkQnAy00000',
                    'friend_uid' : 'jNpViqXD4DXmf9H2FbkQnAy35000',
                    'status' : 'rejected'
                },
                {
                    'user_uid' : 'jNpViqXD4DXmf9H2FbkQnAy00000',
                    'friend_uid' : 'jNpViqXD4DXmf9H2FbkQnAy36000',
                    'status' : 'rejected'
                },
                {
                    'user_uid' : 'jNpViqXD4DXmf9H2FbkQnAy00000',
                    'friend_uid' : 'jNpViqXD4DXmf9H2FbkQnAy37000',
                    'status' : 'rejected'
                }
            ]);
        });
};