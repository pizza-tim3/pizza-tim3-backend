exports.seed = function(knex, Promise) {
    return knex('locations').del()
        .then(() => {
            return knex('locations').insert([
                {'google_place_id': 'ChIJTQY9pYicQIYRBwevxbKgBJU'},
                {'google_place_id': 'ChIJ4zdtwYWcQIYRS9hvr_1t_ig'},
                {'google_place_id': 'ChIJTY1v-SidQIYRWe-hzXZT5jk'},
                {'google_place_id': 'ChIJu1epLWecQIYRjPufvtEjxhQ'}
            ]);
        });
};