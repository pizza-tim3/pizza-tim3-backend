exports.seed = function(knex, Promise) {
  return knex("favorites")
    .del()
    .then(() => {
      return knex("favorites").insert([
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy00000", location_id: 1 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy00000", location_id: 2 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy00000", location_id: 3 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy00000", location_id: 4 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy10000", location_id: 1 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy10000", location_id: 2 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy10000", location_id: 3 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy10000", location_id: 4 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy30000", location_id: 1 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy30000", location_id: 2 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy30000", location_id: 3 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy30000", location_id: 4 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy40000", location_id: 1 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy40000", location_id: 2 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy40000", location_id: 3 },
        { firebase_uid: "jNpViqXD4DXmf9H2FbkQnAy40000", location_id: 4 }
      ]);
    });
};
