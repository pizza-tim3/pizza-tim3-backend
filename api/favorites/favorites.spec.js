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
  }
];

const locations = [
  { google_place_id: "ChIJTQY9pYicQIYRBwevxbKgBJU" },
  { google_place_id: "ChIJ4zdtwYWcQIYRS9hvr_1t_ig" },
  { google_place_id: "ChIJTY1v-SidQIYRWe-hzXZT5jk" },
  { google_place_id: "ChIJu1epLWecQIYRjPufvtEjxhQ" }
];

const expected = [
  {
    id: 1,
    firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
    google_place_id: "ChIJTQY9pYicQIYRBwevxbKgBJU"
  },
  {
    id: 2,
    firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
    google_place_id: "ChIJ4zdtwYWcQIYRS9hvr_1t_ig"
  },
  {
    id: 3,
    firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
    google_place_id: "ChIJTY1v-SidQIYRWe-hzXZT5jk"
  }
];

beforeEach(async () => {
  await db("locations")
    .truncate()
    .insert(locations);

  await db("favorites").truncate();
  await db("favorites").insert(favorites);

  await db("users").truncate();
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
  describe("GET /favorites/:uid/", () => {
    fit("should get all favorites from all users", async () => {
      //all favorites
      const res = await req(server).get("/api/favorites/");
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual(expected);
    });
  });
  describe("GET /favorites/:uid/", () => {
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
  describe("POST /favorites", () => {
    it("should add a favorite for a user", async () => {
      const newFavorite = {
        id: 4,
        firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
        location_id: 4
      };
      //User XVf2XhkNSJWNDGEW4Wh6SHpKYUt2 favorites
      const res = await req(server)
        .post("/api/favorites/")
        .send(newFavorite);
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual(newFavorite);
    });
    it("should return error if not all fields present", async () => {
      const newFavorite = {
        id: 4,
        firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2"
      };
      //User XVf2XhkNSJWNDGEW4Wh6SHpKYUt2 favorites
      const res = await req(server)
        .post("/api/favorites/")
        .send(newFavorite);
      expect(res.status).toBe(401);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        error: `please send and object structured like :{
        firebase_uid: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        location_id: 1
      }`
      });
    });
  });
  describe("DELETE /favorites", () => {
    it("should add a favorite for a user", async () => {
      //User XVf2XhkNSJWNDGEW4Wh6SHpKYUt2 favorites
      const res = await req(server).delete("/api/favorites/3");
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({ message: "Favorite deleted" });

      const alteredFavorites = await db("favorites");
      expect(alteredFavorites).toEqual(favorites.slice(0, 2));
    });
  });
});
