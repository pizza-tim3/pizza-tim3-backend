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

beforeEach(async () => await db("friends").truncate());
afterEach(async () => await db("friends").truncate());

describe("The user Router", () => {
  describe("POST /", () => {
    it("should return a response", async () => {
      const res = await req(server)
        .post("/api/friends")
        .send(users[0]);
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual(users[0]);
    });
  });
});
