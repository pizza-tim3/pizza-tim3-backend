exports.seed = function(knex, Promise) {
    return knex('friends').del()
        .then(() => {
            return knex('friends').insert([
                {
                    'user_uid' : 'XVf2XhkNSJWNDGEW4Wh6SHpKYUt2',
                    'friend_uid' : 'T90z5fuhXcWpE231iBvk0WntdKA2',
                    'status' : 'pending'
                },
                {
                    'user_uid' : 'XVf2XhkNSJWNDGEW4Wh6SHpKYUt2',
                    'friend_uid' : 'KmXqNOKhQSWm3RXt20YjD3WkVif2',
                    'status' : 'pending'
                },
                {
                    'user_uid' : 'XVf2XhkNSJWNDGEW4Wh6SHpKYUt2',
                    'friend_uid' : 'XkSZcV7B2tZrMG0kUTWVdiQ4yDo2',
                    'status' : 'accepted'
                },
                {
                    'user_uid' : 'XVf2XhkNSJWNDGEW4Wh6SHpKYUt2',
                    'friend_uid' : 'RaJMLmDUTWTP870aXFUQ6mLVb1M2',
                    'status' : 'accepted'
                },
                {
                    'user_uid' : 'XVf2XhkNSJWNDGEW4Wh6SHpKYUt2',
                    'friend_uid' : 'IyJoCaT4A7cObBoZDEUEKjhwADE2',
                    'status' : 'rejected'
                },
                {
                    'user_uid' : 'XVf2XhkNSJWNDGEW4Wh6SHpKYUt2',
                    'friend_uid' : 'i2i3UqCe3TbaeXbM1ifzQpsGLRi1',
                    'status' : 'rejected'
                }
            ]);
        });
};