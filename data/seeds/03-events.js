exports.seed = function(knex, Promise) {
  return knex("events")
    .del()
    .then(() => {
      return knex("events").insert([
        {
          event_name: "Chuckee Cheeses",
          inviteOnly: "true",
          event_description: "Get some pizza and games",
          event_date: 1549351804000, //2nd feb , 2019
          organizer: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
          place: "ChIJu1epLWecQIYRjPufvtEjxhQ",
        },
        {
          event_name: "Papa Johns",
          inviteOnly: "false",
          event_description: "Get some gross pizza",
          event_date: 1554622204000, //sunday April 7 2019
          organizer: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
          place: "ChIJ4zdtwYWcQIYRS9hvr_1t_ig",
        },
        {
          event_name: "Dominos",
          inviteOnly: "true",
          event_description: "Really though, this pizza is gross",
          event_date: 1562484604000, //sunday July 7th 2019
          organizer: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
          place: "ChIJTQY9pYicQIYRBwevxbKgBJU",
        },
        {
          event_name: "Italian Heaven Slices",
          inviteOnly: "false",
          event_description: "Get some pizza and games",
          event_date: 1565076604000, // Tuesday August 6th 2019
          organizer: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
          place: "ChIJTY1v-SidQIYRWe-hzXZT5jk",
        },
      ]);
    });
};
