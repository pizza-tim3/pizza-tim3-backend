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
  await db("users").insert(users);
});
afterEach(async () => {
  await db("friends").truncate();
});

describe("The user Router", () => {
  describe("POST /", () => {
    it("should add pending to friend request", async () => {
      const res = await req(server).post("/api/friends/request/1/2");
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
});
