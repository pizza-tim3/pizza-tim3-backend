exports.seed = function(knex, Promise) {
  return knex("favorites")
    .del()
    .then(() => {
      return knex("favorites").insert([
        { firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", location_id: 1 },
        { firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", location_id: 2 },
        { firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", location_id: 3 },
        { firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", location_id: 4 },
        { firebase_uid: "T90z5fuhXcWpE231iBvk0WntdKA2", location_id: 1 },
        { firebase_uid: "T90z5fuhXcWpE231iBvk0WntdKA2", location_id: 2 },
        { firebase_uid: "T90z5fuhXcWpE231iBvk0WntdKA2", location_id: 3 },
        { firebase_uid: "T90z5fuhXcWpE231iBvk0WntdKA2", location_id: 4 },
        { firebase_uid: "KmXqNOKhQSWm3RXt20YjD3WkVif2", location_id: 1 },
        { firebase_uid: "KmXqNOKhQSWm3RXt20YjD3WkVif2", location_id: 2 },
        { firebase_uid: "KmXqNOKhQSWm3RXt20YjD3WkVif2", location_id: 3 },
        { firebase_uid: "KmXqNOKhQSWm3RXt20YjD3WkVif2", location_id: 4 },
        { firebase_uid: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2", location_id: 1 },
        { firebase_uid: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2", location_id: 2 },
        { firebase_uid: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2", location_id: 3 },
        { firebase_uid: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2", location_id: 4 }
      ]);
    });
};
