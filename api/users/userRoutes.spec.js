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
  },
  {
    id: 3,
    email: "test3@test.com",
    firebase_uid: "25897325235",
    username: "RickRoll",
    first_name: "Pickle",
    last_name: "Rick"
  },
  {
    id: 4,
    email: "test4@test.com",
    firebase_uid: "2525235",
    username: "Godsbe",
    first_name: "Yo",
    last_name: "Feet"
  }
];

beforeEach(async () => {
  await db("users").truncate();
  await db("friends").truncate();
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
    fit("should return an error for user if they do not exist", async () => {
      await db("users").insert(users[0]);
      const res = await req(server).get("/api/users/5");
      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({ error: `user with id ${5} does not exist` });
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
    it("should return bad request if user info is empty", async () => {
      const res = await req(server)
        .post("/api/users")
        .send({});
      expect(res.status).toBe(400);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        error: "Bad Request, please include all fields"
      });
    });
    it("should return bad request if user info is incomplete", async () => {
      const res = await req(server)
        .post("/api/users")
        .send({ email: "test2@test.com", firebase_uid: "258975vnfh325235" });
      expect(res.status).toBe(400);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        error: "Bad Request, please include all fields"
      });
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

  describe("GET /:id/friends", () => {
    it("should return a list of friends", async () => {
      try {
        // add the users to the database
        await db("users").insert(users);

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

        // user 1 is friends with user 3
        await db("friends").insert(
          { user_id: 1, friend_id: 3, status: "accepted" },
          "id"
        );
        // user 3 is friends with user 1
        await db("friends").insert(
          { user_id: 3, friend_id: 1, status: "accepted" },
          "id"
        );

        // user 1 is friends with user 4
        await db("friends").insert(
          { user_id: 1, friend_id: 4, status: "accepted" },
          "id"
        );
        // user 4 is friends with user 1
        await db("friends").insert(
          { user_id: 4, friend_id: 1, status: "accepted" },
          "id"
        );

        const res = await req(server).get("/api/users/1/friends");
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body).toEqual([users[1], users[2], users[3]]);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
