const req = require("supertest");
const server = require("../../server");
const db = require("../../data/dbConfig");

describe("The Comments Router", () => {
  beforeEach(async () => {
    const res = await req(server)
      .post("/api/comments/event")
      .send({
        id: 1,
        time: "123",
        message: "message",
        event_id: 1,
        firebase_uid: "258975325235"
      });
  });

  afterEach(async () => await db("comments").delete());

  it("should start testing environment", () => {
    const res = process.env.ENVIRONMENT;
    expect(res).toBe("testing");
  });

  describe("GET /", () => {
    it("should return an array of comments", async () => {
      const res = await req(server).get("/api/comments");

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body.length).toBe(1);
    });
  });

  describe("GET /event_id", () => {
    it("should return comments by event_id", async () => {
      const res = await req(server).get("/api/comments/event/1");

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        id: 1,
        time: "123",
        message: "message",
        event_id: 1,
        firebase_uid: "258975325235"
      });
    });
  });

  describe("POST /", () => {
    it("should add comment to event id", async () => {
      const res = await req(server)
        .post("/api/comments/event")
        .send({
          id: 3,
          time: "123",
          message: "message",
          event_id: 4,
          firebase_uid: "258975325235235252352"
        });
      expect(res.status).toBe(201);
    });
  });

  describe("PUT /:id", () => {
    it("should update comment by id", async () => {
      const res = await req(server)
        .put("/api/comments/1")
        .send({
          id: 1,
          time: "1234",
          message: "message",
          event_id: 1,
          firebase_uid: "258975325235"
        });
      expect(res.status).toBe(201);
    });
  });

  describe("DELETE /:id", () => {
    it("should delete comment by id", async () => {
      const res = await req(server).del("/api/comments/1");
      expect(res.status).toBe(201);
    });
  });
});
