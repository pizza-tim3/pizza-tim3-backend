const req = require('supertest');
const server = require('../../server');
const db = require("../../data/dbConfig");

beforeEach(() => {
  return db("comments").truncate();
});

describe("The Comments Router", () => {
  it('should start testing environment', () => {
    const res = process.env.DB_ENV;
    expect(res).toBe('testing');
  });

  describe("GET /", () => {
    it("should return an array of comments", async () => {
      const comments = [{
        id: 1,
        time: "1234",
        message: "message",
        event_id: 1,
        user_id: 1,
      }];

      await db("comments").insert(comments);
      const res = await req(server).get("/api/comments");

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body.length).toBe(1);
      expect(res.body).toEqual([{
        id: 1,
        time: "1234",
        message: "message",
        event_id: 1,
        user_id: 1,
      }]);
    });
  });
});