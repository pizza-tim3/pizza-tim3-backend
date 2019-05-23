const server = require('../../server.js');
const request = require('supertest');
const db = require('../../data/dbConfig');

beforeEach(() => db('users').delete());

describe('comments backend', () => {
  it('should set testing environment', () => {
    const env = process.env.DB_ENV;
    expect(env).toBe('testing');
  });
});