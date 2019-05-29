exports.seed = function(knex, Promise) {
    return knex('events').del()
        .then(() => {
            return knex('events').insert([
                {
                    'event_name': 'Chuckee Cheeses',
                    'event_description': 'Get some pizza and games',
                    'event_date': '10/10/2019',
                    'organizer': '1',
                    'place': '1'
                },
                {
                    'event_name': 'Papa Johns',
                    'event_description': 'Get some gross pizza',
                    'event_date': '10/09/2019',
                    'organizer': '1',
                    'place': '2'
                },
                {
                    'event_name': 'Dominos',
                    'event_description': 'Really though, this pizza is gross',
                    'event_date': '10/08/2019',
                    'organizer': '1',
                    'place': '3'
                },
                {
                    'event_name': 'Italian Heaven Slices',
                    'event_description': 'Get some pizza and games',
                    'event_date': '07/06/2019',
                    'organizer': '1',
                    'place': '4'
                },
            ]);
        });
};