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

beforeEach(() => {
  return db("users").truncate();
});

afterEach(async () => await db("comments").truncate());

describe("The user Router", () => {
  describe("GET /", () => {
    it("should return an array of users", async () => {
      await db("users").insert(users);
      const res = await req(server).get("/api/users");

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body.length).toBe(2);
      expect(res.body).toEqual(users);
    });
  });

  describe("GET /:id", () => {
    it("should return a single user with specified id", async () => {
      await db("users").insert(users[0]);
      const res = await req(server).get("/api/users/1");
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual(users[0]);
    });
  });

  describe("POST /", () => {
    it("should return added user", async () => {
      const res = await req(server)
        .post("/api/users")
        .send(users[0]);
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual(users[0]);
    });
  });

  describe("PUT /:id", () => {
    it("should update and return updated user", async () => {
      await db("users").insert(users[0]);
      const updatedUser = { ...users[0], username: "ToddHoward" };
      const res = await req(server)
        .put("/api/users/1")
        .send(updatedUser);
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual(updatedUser);
    });
  });

  describe("DELETE /:id", () => {
    it("should delete user and return a message", async () => {
      await db("users").insert(users[0]);
      const res = await req(server).delete("/api/users/1");
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({ message: "User deleted" });
    });
  });
});
