const req = require("supertest");
const server = require("../../server");
const db = require("../../data/dbConfig");

const users = [
  {
    id: 506,
    email: "test6@gmail.com",
    firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
    username: "Carlotta.Zieme47",
    first_name: "Quinn",
    last_name: "Jaskolski",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/vaughanmoffitt/128.jpg",
    crust: "incidunt",
    topping: "dicta",
    slices: "59272"
  },
  {
    id: 507,
    email: "test5@gmail.com",
    firebase_uid: "T90z5fuhXcWpE231iBvk0WntdKA2",
    username: "Sherman.Mills",
    first_name: "Al",
    last_name: "Grady",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg",
    crust: "ipsa",
    topping: "autem",
    slices: "91633"
  },
  {
    id: 508,
    email: "test4@gmail.com",
    firebase_uid: "KmXqNOKhQSWm3RXt20YjD3WkVif2",
    username: "Elaina_Adams",
    first_name: "Lillie",
    last_name: "Bins",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/scips/128.jpg",
    crust: "ducimus",
    topping: "dolorem",
    slices: "40686"
  },
  {
    id: 509,
    email: "test3@gmail.com",
    firebase_uid: "XkSZcV7B2tZrMG0kUTWVdiQ4yDo2",
    username: "Brooks.Buckridge18",
    first_name: "Tanya",
    last_name: "Mann",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/spacewood_/128.jpg",
    crust: "dolorem",
    topping: "voluptas",
    slices: "54462"
  },
  {
    id: 510,
    email: "test2@gmail.com",
    firebase_uid: "RaJMLmDUTWTP870aXFUQ6mLVb1M2",
    username: "Amira44",
    first_name: "Abner",
    last_name: "Glover",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/michaelkoper/128.jpg",
    crust: "rerum",
    topping: "quibusdam",
    slices: "66554"
  },
  {
    id: 511,
    email: "test1@gmail.com",
    firebase_uid: "IyJoCaT4A7cObBoZDEUEKjhwADE2",
    username: "Phoebe.Stehr",
    first_name: "Murray",
    last_name: "Shanahan",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/orkuncaylar/128.jpg",
    crust: "dolor",
    topping: "exercitationem",
    slices: "81032"
  },
  {
    id: 512,
    email: "test@gmail.com",
    firebase_uid: "i2i3UqCe3TbaeXbM1ifzQpsGLRi1",
    username: "Savanna_Kub",
    first_name: "Leola",
    last_name: "Parisian",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/overcloacked/128.jpg",
    crust: "exercitationem",
    topping: "aut",
    slices: "85095"
  }
];

beforeEach(async () => {
  await db("users").truncate();
  await db("friends").truncate();
  await db("users").insert(users);
});

describe("The user Router", () => {
  describe("GET /request/:user_uid/friend_uid", () => {
    it("should add a pending friend request with friend_uid===friend_uid and user_uid===user_uid", async () => {
      const user1_uid = users[0].firebase_uid;
      const user2_uid = users[1].firebase_uid;
      //User user1_uid is friend requesting user user2_uid
      const res = await req(server).get(
        `/api/friends/request/${user1_uid}/${user2_uid}`
      );
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        friend_uid: user2_uid,
        id: 1,
        status: "pending",
        user_uid: user1_uid
      });
    });
    it("should return a 404 message if user one does not exist", async () => {
      // user one has been deleted
      await db("users")
        .where({ id: 1 })
        .del();

      const user = await db("users")
        .where({ id: 1 })
        .first();

      //User 1 is friend requesting user 2
      const res = await req(server).get(
        "/api/friends/request/258975325235/258975vnfh325235"
      );

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 258975325235 does not exist`
      });
    });
    it("should return a 404 message if user two does not exist", async () => {
      const user1_uid = users[0].firebase_uid;
      // user two has been deleted
      await db("users")
        .where({ id: 2 })
        .del();

      const user = await db("users")
        .where({ id: 2 })
        .first();

      //User 1 is friend requesting user 2
      const res = await req(server).get(
        `/api/friends/request/${user1_uid}/258975vnfh325235`
      );

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 258975vnfh325235 does not exist`
      });
    });
  });

  describe("GET /accept/:user_uid/friend_uid", () => {
    fit("should accept pending friend request", async () => {
      const user1_uid = users[0].firebase_uid;
      const user2_uid = users[1].firebase_uid;
      // user 1 has made a friend request to user 2
      const ids = await db("friends").insert(
        [
          {
            user_uid: user2_uid, //test6@gmail.com
            friend_uid: user1_uid, //test5@gmail.com
            status: "pending"
          }
        ],
        "id"
      );
      // user 1 accepts user 2's friend request
      const res = await req(server).get(
        "/api/friends/accept/XVf2XhkNSJWNDGEW4Wh6SHpKYUt2/T90z5fuhXcWpE231iBvk0WntdKA2"
      );

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      //expect both to be updated and accepted
      expect(res.body).toEqual({
        id: 2,
        user_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
        friend_uid: "T90z5fuhXcWpE231iBvk0WntdKA2", //test5@gmail.com
        status: "accepted"
      });

      //check that original request was updated
      const [accepted] = await db("friends").where({ id: 1 });
      expect(accepted).toEqual({
        id: 1,
        user_uid: "T90z5fuhXcWpE231iBvk0WntdKA2", //test5@gmail.com
        friend_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
        status: "accepted"
      });
    });
    it("should return a 404 message if user one does not exist", async () => {
      // user one has been deleted
      await db("users")
        .where({ id: 1 })
        .del();

      const user = await db("users")
        .where({ id: 1 })
        .first();

      //User 1 is friend raccepting user 2
      const res = await req(server).get(
        "/api/friends/accept/258975325235/258975vnfh325235"
      );

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 258975325235 does not exist`
      });
    });
    it("should return a 404 message if user two does not exist", async () => {
      // user two has been deleted
      await db("users")
        .where({ id: 2 })
        .del();

      const user = await db("users")
        .where({ id: 2 })
        .first();

      //User 1 is friend accepting user 2
      const res = await req(server).get(
        "/api/friends/accept/258975325235/258975vnfh325235"
      );

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 258975vnfh325235 does not exist`
      });
    });
    it("should return a 404 message if pending request does not exist", async () => {
      //User 1 is friend accepting user 2's friend request
      const res = await req(server).get(
        "/api/friends/accept/258975325235/258975vnfh325235"
      );

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        error: `pending friend request with ${"258975vnfh325235"} does not exist`
      });
    });
  });

  describe("GET /reject/:user_uid/friend_uid", () => {
    it("should reject pending friend request", async () => {
      // user 1 is friend requesting user 2

      const userList = [
        {
          id: 3,
          email: "Jerrold_Ratke18@yahoo.com",
          firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
          username: "Jolie_Corkery52",
          first_name: "Hulda",
          last_name: "Ortiz",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/murrayswift/128.jpg",
          crust: "modi",
          topping: "et",
          slices: "84830"
        },
        {
          id: 4,
          email: "Johan1@gmail.com",
          firebase_uid: "T90z5fuhXcWpE231iBvk0WntdKA2",
          username: "Alexandro.Hartmann53",
          first_name: "Augustine",
          last_name: "Farrell",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/amayvs/128.jpg",
          crust: "voluptas",
          topping: "explicabo",
          slices: "35378"
        }
      ];
      await db("users").insert(userList);
      // user 1 has made a friend request to user 2
      const ids = await db("friends").insert(
        [
          {
            user_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
            friend_uid: "T90z5fuhXcWpE231iBvk0WntdKA2", //test5@gmail.com
            status: "pending"
          },
          {
            user_uid: "T90z5fuhXcWpE231iBvk0WntdKA2", //test5@gmail.com
            friend_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2", //test6@gmail.com
            status: "pending"
          }
        ],
        "id"
      );

      // user 2 is rejecting user 1's friend request
      const res = await req(server).get(
        "/api/friends/reject/XVf2XhkNSJWNDGEW4Wh6SHpKYUt2/T90z5fuhXcWpE231iBvk0WntdKA2"
      );

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      //expect both to be updated and rejected
      expect(res.body).toEqual({
        friend_uid: "T90z5fuhXcWpE231iBvk0WntdKA2",
        id: 1,
        status: "rejected",
        user_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2"
      });
    });
    it("should return a 404 message if user one does not exist", async () => {
      // user one has been deleted
      await db("users")
        .where({ id: 1 })
        .del();

      const user = await db("users")
        .where({ id: 1 })
        .first();

      //User 1 is friend requesting user 2
      const res = await req(server).get(
        "/api/friends/reject/258975325235/258975vnfh325235"
      );

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 258975325235 does not exist`
      });
    });
    it("should return a 404 message if user two does not exist", async () => {
      // user two has been deleted
      await db("users")
        .where({ id: 2 })
        .del();

      const user = await db("users")
        .where({ id: 2 })
        .first();

      //User 1 is friend requesting user 2
      const res = await req(server).get(
        "/api/friends/reject/258975325235/258975vnfh325235"
      );

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 258975vnfh325235 does not exist`
      });
    });
    it("should return a 404 message if pending request does not exist", async () => {
      //User 1 is friend rejecting user 2's friend request
      const res = await req(server).get(
        "/api/friends/reject/258975325235/258975vnfh325235"
      );

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        error: `pending friend request with ${"258975vnfh325235"} does not exist`
      });
    });
  });

  describe("DELETE /:user_uid/friend_uid", () => {
    it("should delete a friend relationship", async () => {
      // user 1 is friends with user 2
      const [userOne] = await db("friends").insert(
        {
          user_uid: "258975325235",
          friend_uid: "258975vnfh325235",
          status: "accepted"
        },
        "id"
      );
      // user 2 is friends with user 1
      const [userTwo] = await db("friends").insert(
        {
          user_uid: "258975vnfh325235",
          friend_uid: "258975325235",
          status: "accepted"
        },
        "id"
      );

      // user 2 is deleting user 1 friend relationship
      const res = await req(server).delete(
        "/api/friends/258975vnfh325235/258975325235"
      );

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      //expect both to be updated and rejected
      expect(res.body).toEqual({
        message: `friend with id ${"258975325235"} deleted`
      });

      // check if user 1 is friends with user 2
      const [userOneAfterDelete] = await db("friends").where({
        user_uid: "258975325235",
        friend_uid: "258975vnfh325235",
        status: "accepted"
      });
      // check if user 2 is friends with user 1
      const [userTwoAfterDelete] = await db("friends").where({
        user_uid: "258975vnfh325235",
        friend_uid: "258975325235",
        status: "accepted"
      });

      expect(userOneAfterDelete).toBe(undefined);
      expect(userTwoAfterDelete).toBe(undefined);
    });
    it("should return a 404 message if user one does not exist", async () => {
      // user one has been deleted
      await db("users")
        .where({ id: 1 })
        .del();

      const user = await db("users")
        .where({ id: 1 })
        .first();

      //User 1 is friend requesting user 2
      const res = await req(server).delete(
        "/api/friends/258975325235/258975vnfh325235"
      );

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 258975325235 does not exist`
      });
    });
    it("should return a 404 message if user two does not exist", async () => {
      // user two has been deleted
      await db("users")
        .where({ id: 2 })
        .del();

      const user = await db("users")
        .where({ id: 2 })
        .first();

      //User 1 is friend requesting user 2
      const res = await req(server).delete(
        "/api/friends/258975325235/258975vnfh325235"
      );

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 258975vnfh325235 does not exist`
      });
    });
    it("should return a 404 message if friendship does not exist", async () => {
      const [userOne] = await db("friends").insert(
        { user_uid: 1, friend_uid: 2, status: "accepted" },
        "id"
      );
      //User 1 is friend deleting 2's friend
      const res = await req(server).delete(
        "/api/friends/258975325235/258975vnfh325235"
      );

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        error: `friendship with ${"258975vnfh325235"} does not exist`
      });
    });
  });

  describe("GET /:uid", () => {
    it("should return a list of accepted friends", async () => {
      const userList = [
        {
          id: 3,
          email: "Frederick.Davis79@hotmail.com",
          firebase_uid: "61283427b08345f48bf263298bb",
          username: "Carlo20",
          first_name: "Franco",
          last_name: "Wehner",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/leonfedotov/128.jpg",
          crust: "impedit",
          topping: "aperiam",
          slices: "99193"
        },
        {
          id: 4,
          email: "Dorris95@yahoo.com",
          firebase_uid: "8bdab6803059476baec16a8d980",
          username: "Rosalia.Ondricka",
          first_name: "Rodrick",
          last_name: "Goyette",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg",
          crust: "voluptatem",
          topping: "doloribus",
          slices: "75389"
        },
        {
          id: 5,
          email: "Jerrold_Ratke18@yahoo.com",
          firebase_uid: "6e28d4d53dfb4d5b85aef1b3237",
          username: "Jolie_Corkery52",
          first_name: "Hulda",
          last_name: "Ortiz",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/murrayswift/128.jpg",
          crust: "modi",
          topping: "et",
          slices: "84830"
        },
        {
          id: 6,
          email: "Johan1@gmail.com",
          firebase_uid: "b9472482c8b347f9b043aef2efb",
          username: "Alexandro.Hartmann53",
          first_name: "Augustine",
          last_name: "Farrell",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/amayvs/128.jpg",
          crust: "voluptas",
          topping: "explicabo",
          slices: "35378"
        },
        {
          id: 7,
          email: "Kevin.Pfannerstill9@yahoo.com",
          firebase_uid: "d8a2b7e34b9d4b17be9c02b0065",
          username: "Monte_Rolfson",
          first_name: "Whitney",
          last_name: "Stoltenberg",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/okseanjay/128.jpg",
          crust: "omnis",
          topping: "consequuntur",
          slices: "29317"
        }
      ];
      try {
        await db("users").insert(userList);

        await db("friends").insert([
          {
            user_uid: "61283427b08345f48bf263298bb", //3
            friend_uid: "8bdab6803059476baec16a8d980", //4
            status: "accepted"
          },
          {
            user_uid: "8bdab6803059476baec16a8d980", //4
            friend_uid: "61283427b08345f48bf263298bb", //3
            status: "accepted"
          },
          {
            user_uid: "61283427b08345f48bf263298bb", //3
            friend_uid: "6e28d4d53dfb4d5b85aef1b3237", //5
            status: "accepted"
          },
          {
            user_uid: "6e28d4d53dfb4d5b85aef1b3237", //5
            friend_uid: "61283427b08345f48bf263298bb", //3
            status: "accepted"
          },
          {
            user_uid: "61283427b08345f48bf263298bb", //3
            friend_uid: "b9472482c8b347f9b043aef2efb", //6
            status: "pending"
          }
        ]);

        const res = await req(server).get(
          "/api/friends/61283427b08345f48bf263298bb"
        );
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        console.log(res.body);
        expect(res.body).toEqual([
          { ...userList[1], status: "accepted" },
          { ...userList[2], status: "accepted" },
          { ...userList[3], status: "pending" }
        ]);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("GET /:uid/pending", () => {
    it("should return a list of pending friends", async () => {
      try {
        // add the users to the database
        await db("users").insert(users);

        // user 1 sends a friend request to 2
        const [userOne] = await db("friends").insert(
          {
            user_uid: "258975325235",
            friend_uid: "258975vnfh325235",
            status: "pending"
          },
          "id"
        );

        // user 1  sends a friend request to 3
        await db("friends").insert(
          {
            user_uid: "258975325235",
            friend_uid: "25897325235",
            status: "pending"
          },
          "id"
        );
        // user 1 sends a friend request to 4
        await db("friends").insert(
          {
            user_uid: "258975325235",
            friend_uid: "2525235",
            status: "pending"
          },
          "id"
        );

        const res = await req(server).get("/api/friends/258975325235/pending");
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body).toEqual([users[1], users[2], users[3]]);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
