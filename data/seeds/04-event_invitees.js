//jNpViqXD4DXmf9H2FbkQnAyoLyu1
exports.seed = function(knex, Promise) {
  return knex("invited")
    .del()
    .then(() => {
      return knex("invited").insert([
        {
          event_id: "1", //1
          user_id: "T90z5fuhXcWpE231iBvk0WntdKA2",
          pending: "true",
          accepted: "false",
          declined: "false"
        },
        {
          event_id: "1", //2
          user_id: "KmXqNOKhQSWm3RXt20YjD3WkVif2",
          pending: "true",
          accepted: "false",
          declined: "false"
        },
        {
          event_id: "1", //3
          user_id: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2",
          pending: "false",
          accepted: "true",
          declined: "false"
        },
        {
          event_id: "1", //4
          user_id: "RaJMLmDUTWTP870aXFUQ6mLVb1M2",
          pending: "true",
          accepted: "false",
          declined: "false"
        },
        {
          event_id: "2", //1
          user_id: "T90z5fuhXcWpE231iBvk0WntdKA2",
          pending: "true",
          accepted: "false",
          declined: "false"
        },
        {
          event_id: "2", //2
          user_id: "KmXqNOKhQSWm3RXt20YjD3WkVif2",
          pending: "true",
          accepted: "false",
          declined: "false"
        },
        {
          event_id: "2", //3
          user_id: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2",
          pending: "true",
          accepted: "false",
          declined: "false"
        },
        {
          event_id: "2", //4
          user_id: "RaJMLmDUTWTP870aXFUQ6mLVb1M2",
          pending: "false",
          accepted: "true",
          declined: "false"
        },
        {
          event_id: "3", //1
          user_id: "T90z5fuhXcWpE231iBvk0WntdKA2",
          pending: "true",
          accepted: "false",
          declined: "false"
        },
        {
          event_id: "3", //2
          user_id: "KmXqNOKhQSWm3RXt20YjD3WkVif2",
          pending: "true",
          accepted: "false",
          declined: "false"
        },
        {
          event_id: "3", //3
          user_id: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2",
          pending: "false",
          accepted: "true",
          declined: "false"
        },
        {
          event_id: "3", //4
          user_id: "RaJMLmDUTWTP870aXFUQ6mLVb1M2",
          pending: "false",
          accepted: "true",
          declined: "false"
        },
        {
          event_id: "3", //5
          user_id: "IyJoCaT4A7cObBoZDEUEKjhwADE2",
          pending: "false",
          accepted: "false",
          declined: "true"
        },
        {
          event_id: "3", //6
          user_id: "i2i3UqCe3TbaeXbM1ifzQpsGLRi1",
          pending: "false",
          accepted: "false",
          declined: "true"
        },
        {
          event_id: "4", //1
          user_id: "T90z5fuhXcWpE231iBvk0WntdKA2",
          pending: "true",
          accepted: "false",
          declined: "false"
        },
        {
          event_id: "4", //2
          user_id: "KmXqNOKhQSWm3RXt20YjD3WkVif2",
          pending: "true",
          accepted: "false",
          declined: "false"
        },
        {
          event_id: "4", //3
          user_id: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2",
          pending: "false",
          accepted: "true",
          declined: "false"
        },
        {
          event_id: "4", //4
          user_id: "RaJMLmDUTWTP870aXFUQ6mLVb1M2",
          pending: "false",
          accepted: "true",
          declined: "false"
        }
      ]);
    });
};
