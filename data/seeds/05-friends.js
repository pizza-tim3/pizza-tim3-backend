exports.seed = function(knex, Promise) {
  return knex("friends")
    .del()
    .then(() => {
      return knex("friends").insert([
        {
          user_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
          friend_uid: "T90z5fuhXcWpE231iBvk0WntdKA2", //test5@gmail.com
          status: "accepted"
        },
        {
          user_uid: "T90z5fuhXcWpE231iBvk0WntdKA2", //test5@gmail.com
          friend_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
          status: "accepted"
        },
        {
          user_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
          friend_uid: "KmXqNOKhQSWm3RXt20YjD3WkVif2", //test4@gmail.com
          status: "accepted"
        },
        {
          user_uid: "KmXqNOKhQSWm3RXt20YjD3WkVif2", //test4@gmail.com
          friend_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
          status: "accepted"
        },
        {
          user_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
          friend_uid: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2", //test3@gmail.com
          status: "accepted"
        },
        {
          user_uid: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2", //test3@gmail.com
          friend_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
          status: "accepted"
        },
        {
          user_uid: "RaJMLmDUTWTP870aXFUQ6mLVb1M2", //test2@gmail.com
          friend_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
          status: "pending"
        },
        {
          user_uid: "IyJoCaT4A7cObBoZDEUEKjhwADE2", //test1@gmail.com
          friend_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
          status: "pending"
        },
        {
          user_uid: "i2i3UqCe3TbaeXbM1ifzQpsGLRi1", //test@gmail.com
          friend_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
          status: "pending"
        }
      ]);
    });
};
