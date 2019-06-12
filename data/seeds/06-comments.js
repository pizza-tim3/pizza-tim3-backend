exports.seed = function(knex, Promise) {
  let date = new Date();
  return knex("comments")
    .del()
    .then(() => {
      return knex("comments").insert([
        {
          time: `${date}`,
          message: "YOYOYO WAS GUD",
          event_id: "1",
          user_id: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2"
        },
        {
          time: `${date}`,
          message:
            "My fiance is literally having a convo with our cat right now",
          event_id: "1",
          user_id: "T90z5fuhXcWpE231iBvk0WntdKA2"
        },
        {
          time: `${date}`,
          message: "it puts the lotion on the skin...",
          event_id: "1",
          user_id: "KmXqNOKhQSWm3RXt20YjD3WkVif2"
        },
        {
          time: `${date}`,
          message: "..or it gets the hose again",
          event_id: "1",
          user_id: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2"
        },
        {
          time: `${date}`,
          message: "Second time lucky",
          event_id: "2",
          user_id: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2"
        },
        {
          time: `${date}`,
          message: "Different event - different comment",
          event_id: "2",
          user_id: "T90z5fuhXcWpE231iBvk0WntdKA2"
        },
        {
          time: `${date}`,
          message: "it puts the lotion on the skin...",
          event_id: "2",
          user_id: "KmXqNOKhQSWm3RXt20YjD3WkVif2"
        },
        {
          time: `${date}`,
          message: ".Aaa *#@# here we go again",
          event_id: "2",
          user_id: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2"
        },
        {
          time: `${date}`,
          message: "No bueno",
          event_id: "3",
          user_id: "RaJMLmDUTWTP870aXFUQ6mLVb1M2"
        },
        {
          time: `${date}`,
          message: "Marcia, Marcia, Marcia",
          event_id: "3",
          user_id: "IyJoCaT4A7cObBoZDEUEKjhwADE2"
        },
        {
          time: `${date}`,
          message: "Great stuff, great stuff",
          event_id: "3",
          user_id: "i2i3UqCe3TbaeXbM1ifzQpsGLRi1"
        },
        {
          time: `${date}`,
          message: "..or it gets the hose again",
          event_id: "3",
          user_id: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2"
        },
        {
          time: `${date}`,
          message: "YOYOYO WAS GUD",
          event_id: "4",
          user_id: "T90z5fuhXcWpE231iBvk0WntdKA2"
        },
        {
          time: `${date}`,
          message:
            "My fiance is literally having a convo with our cat right now",
          event_id: "4",
          user_id: "KmXqNOKhQSWm3RXt20YjD3WkVif2"
        },
        {
          time: `${date}`,
          message: "it puts the lotion on the skin...",
          event_id: "4",
          user_id: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2"
        },
        {
          time: `${date}`,
          message: "..or it gets the hose again",
          event_id: "4",
          user_id: "RaJMLmDUTWTP870aXFUQ6mLVb1M2"
        }
      ]);
    });
};
