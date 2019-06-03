exports.seed = function(knex, Promise) {
    return knex('events').del()
        .then(() => {
            return knex('events').insert([
                {
                    'event_name': 'Chuckee Cheeses',
                    'event_description': 'Get some pizza and games',
                    'event_date': 1549351804000,//2nd feb , 2019
                    'organizer': '1jNpViqXD4DXmf9H2FbkQnAyoLyu1',
                    'place': '1'
                },
                {
                    'event_name': 'Papa Johns',
                    'event_description': 'Get some gross pizza',
                    'event_date': 1554622204000,//sunday April 7 2019
                    'organizer': 'jNpViqXD4DXmf9H2FbkQnAyoLyu1',
                    'place': '2'
                },
                {
                    'event_name': 'Dominos',
                    'event_description': 'Really though, this pizza is gross',
                    'event_date': 1562484604000,//sunday July 7th 2019
                    'organizer': 'jNpViqXD4DXmf9H2FbkQnAyoLyu1',
                    'place': '3'
                },
                {
                    'event_name': 'Italian Heaven Slices',
                    'event_description': 'Get some pizza and games',
                    'event_date': 1565076604000, // Tuesday August 6th 2019
                    'organizer': 'jNpViqXD4DXmf9H2FbkQnAyoLyu1',
                    'place': '4'
                },
            ]);
        });
};