const req = require("supertest");
const server = require("../../server");
const db = require("../../data/dbConfig");

const favorites = [
  {
    id: 1,
    firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
    location_id: 1
  },
  {
    id: 2,
    firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
    location_id: 2
  },
  {
    id: 3,
    firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
    location_id: 3
  },
  {
    id: 4,
    firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
    location_id: 4
  }
];

beforeEach(async () => {
  await db("users").truncate();
  await db("favorites").truncate();
  await db("favorites").insert(favorites);
  await db("users").insert({
    id: 1,
    email: "test@test.com",
    firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
    username: "Ralphiu",
    first_name: "Ralph",
    last_name: "Pill"
  });
});

describe("The Favorites Router", () => {
  describe("GET /favorites/:firebase_uid/", () => {
    it("should get all favorites from user", async () => {
      //User XVf2XhkNSJWNDGEW4Wh6SHpKYUt2 favorites
      const res = await req(server).get(
        "/api/favorites/XVf2XhkNSJWNDGEW4Wh6SHpKYUt2"
      );
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual(favorites);
    });
    it("should return 404 if no user with uid exists", async () => {
      //User favorites
      const res = await req(server).get("/api/favorites/XVf2XhkNSJWN");
      expect(res.status).toBe(404);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        error: `user with id XVf2XhkNSJWN does not exist`
      });
    });
  });
});
