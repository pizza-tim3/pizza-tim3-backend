const req = require("supertest");
const server = require("../../server");
const db = require("../../data/dbConfig");

const users = [
  {
    id: 1,
    email: "test@test.com",
    firebase_uid: "258975325235",
    username: "Ralphiu",
    first_name: "Ralph",
    last_name: "Pill"
  },
  {
    id: 2,
    email: "test2@test.com",
    firebase_uid: "258975vnfh325235",
    username: "Trogdor",
    first_name: "reed",
    last_name: "Breet"
  }
];

beforeEach(async () => {
  await db("users").truncate();
  await db("friends").truncate();
  await db("users").insert(users);
});

describe("The user Router", () => {
  describe("GET /request/:user_id/friend_id", () => {
    it("should add pending to friend request", async () => {
      //User 1 is friend requesting user 2
      const res = await req(server).get("/api/friends/request/1/2");
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        friend_id: 2,
        id: 1,
        status: "pending",
        user_id: 1
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
      const res = await req(server).get("/api/friends/request/1/2");

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 1 does not exist`
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
      const res = await req(server).get("/api/friends/request/1/2");

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 2 does not exist`
      });
    });
  });

  describe("GET /accept/:user_id/friend_id", () => {
    it("should accept pending friend request", async () => {
      // user 1 has made a friend request to user 2
      const [id] = await db("friends").insert(
        { user_id: 1, friend_id: 2, status: "pending" },
        "id"
      );

      // user 2 accepts user 1's friend request
      const res = await req(server).get("/api/friends/accept/2/1");

      const [accepted] = await await db("friends").where({ id });

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      //expect both to be updated and accepted
      expect(res.body).toEqual({
        friend_id: 1,
        id: 2,
        status: "accepted",
        user_id: 2
      });

      expect(accepted).toEqual({
        friend_id: 2,
        id: 1,
        status: "accepted",
        user_id: 1
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
      const res = await req(server).get("/api/friends/accept/1/2");

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 1 does not exist`
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
      const res = await req(server).get("/api/friends/accept/1/2");

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 2 does not exist`
      });
    });
    it("should return a 404 message if pending request does not exist", async () => {
      //User 1 is friend accepting user 2's friend request
      const res = await req(server).get("/api/friends/accept/1/2");

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        error: `pending friend request with ${2} does not exist`
      });
    });
  });

  describe("GET /reject/:user_id/friend_id", () => {
    it("should reject pending friend request", async () => {
      // user 1 is friend requesting user 2
      const [id] = await db("friends").insert(
        { user_id: 1, friend_id: 2, status: "pending" },
        "id"
      );

      // user 2 is rejecting user 1's friend request
      const res = await req(server).get("/api/friends/reject/2/1");

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      //expect both to be updated and rejected
      expect(res.body).toEqual({
        friend_id: 2,
        id: 1,
        status: "rejected",
        user_id: 1
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
      const res = await req(server).get("/api/friends/reject/1/2");

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 1 does not exist`
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
      const res = await req(server).get("/api/friends/reject/1/2");

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 2 does not exist`
      });
    });
    it("should return a 404 message if pending request does not exist", async () => {
      //User 1 is friend rejecting user 2's friend request
      const res = await req(server).get("/api/friends/reject/1/2");

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        error: `pending friend request with ${2} does not exist`
      });
    });
  });

  describe("DELETE /:user_id/friend_id", () => {
    fit("should delete a friend relationship", async () => {
      // user 1 is friends with user 2
      const [userOne] = await db("friends").insert(
        { user_id: 1, friend_id: 2, status: "accepted" },
        "id"
      );
      // user 2 is friends with user 1
      const [userTwo] = await db("friends").insert(
        { user_id: 2, friend_id: 1, status: "accepted" },
        "id"
      );

      // user 2 is deleting user 1 friend relationship
      const res = await req(server).delete("/api/friends/2/1");

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      //expect both to be updated and rejected
      expect(res.body).toEqual({ message: `friend with id ${1} deleted` });

      // check if user 1 is friends with user 2
      const [userOneAfterDelete] = await db("friends").where({
        user_id: 1,
        friend_id: 2,
        status: "accepted"
      });
      // check if user 2 is friends with user 1
      const [userTwoAfterDelete] = await db("friends").where({
        user_id: 1,
        friend_id: 2,
        status: "accepted"
      });

      expect(userOneAfterDelete).toBe(undefined);
      expect(userTwoAfterDelete).toBe(undefined);
    });
    fit("should return a 404 message if user one does not exist", async () => {
      // user one has been deleted
      await db("users")
        .where({ id: 1 })
        .del();

      const user = await db("users")
        .where({ id: 1 })
        .first();

      //User 1 is friend requesting user 2
      const res = await req(server).delete("/api/friends/1/2");

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 1 does not exist`
      });
    });
    fit("should return a 404 message if user two does not exist", async () => {
      // user two has been deleted
      await db("users")
        .where({ id: 2 })
        .del();

      const user = await db("users")
        .where({ id: 2 })
        .first();

      //User 1 is friend requesting user 2
      const res = await req(server).delete("/api/friends/1/2");

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(user).toBe(undefined);
      expect(res.body).toEqual({
        error: `user with id 2 does not exist`
      });
    });
    fit("should return a 404 message if friendship does not exist", async () => {
      const [userOne] = await db("friends").insert(
        { user_id: 1, friend_id: 2, status: "accepted" },
        "id"
      );
      //User 1 is friend deleting 2's friend
      const res = await req(server).delete("/api/friends/1/2");

      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        error: `friendship with ${2} does not exist`
      });
    });
  });
});
