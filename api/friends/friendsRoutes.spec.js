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
  });

  describe("GET /accept/:user_id/friend_id", () => {
    it("should accept pending friend request", async () => {
      // user 1 has made a friend request to user 2
      const [id] = await db("friends").insert(
        { user_id: 1, friend_id: 2 },
        "id"
      );
      await db("friends")
        .update({ status: "pending" }, "id")
        .where({ id });

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
    xit("should throw error if request dne", async () => {});
    xit("should throw error if request has been rejected", async () => {});
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
    xit("should throw error if request dne", async () => {});
    xit("should throw error if request has been rejected", async () => {});
  });

  describe("DELETE /:user_id/friend_id", () => {
    it("should delete a friend relationship", async () => {
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
      expect(res.body).toEqual({ message: "friend deleted" });

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
    xit("should return bad request a friendship dne", async () => {});
    xit("should throw error if request has been rejected", async () => {});
  });
});
