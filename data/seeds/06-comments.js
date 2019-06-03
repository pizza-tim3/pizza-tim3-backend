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
          user_id: "jNpViqXD4DXmf9H2FbkQnAy00000",
        },
        {
          time: `${date}`,
          message:
            "My fiance is literally having a convo with our cat right now",
          event_id: "1",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy10000",
        },
        {
          time: `${date}`,
          message: "it puts the lotion on the skin...",
          event_id: "1",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy20000",
        },
        {
          time: `${date}`,
          message: "..or it gets the hose again",
          event_id: "1",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy30000",
        },
        {
          time: `${date}`,
          message: "Second time lucky",
          event_id: "2",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy00000",
        },
        {
          time: `${date}`,
          message: "Different event - different comment",
          event_id: "2",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy10000",
        },
        {
          time: `${date}`,
          message: "it puts the lotion on the skin...",
          event_id: "2",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy20000",
        },
        {
          time: `${date}`,
          message: ".Aaa *#@# here we go again",
          event_id: "2",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy30000",
        },
        {
          time: `${date}`,
          message: "No bueno",
          event_id: "3",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy00000",
        },
        {
          time: `${date}`,
          message: "Marcia, Marcia, Marcia",
          event_id: "3",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy10000",
        },
        {
          time: `${date}`,
          message: "Great stuff, great stuff",
          event_id: "3",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy20000",
        },
        {
          time: `${date}`,
          message: "..or it gets the hose again",
          event_id: "3",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy30000",
        },
        {
          time: `${date}`,
          message: "YOYOYO WAS GUD",
          event_id: "4",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy00000",
        },
        {
          time: `${date}`,
          message:
            "My fiance is literally having a convo with our cat right now",
          event_id: "4",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy10000",
        },
        {
          time: `${date}`,
          message: "it puts the lotion on the skin...",
          event_id: "4",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy20000",
        },
        {
          time: `${date}`,
          message: "..or it gets the hose again",
          event_id: "4",
          user_id: "jNpViqXD4DXmf9H2FbkQnAy30000",
        },
      ]);
    });
};
