import request from 'supertest';
import app from '../app.js';

describe('Streaming Games API', () => {

  describe('GET /api/streaming-games/most-viewed', () => {
    it('should return the most viewed game on Twitch', async () => {
      const res = await request(app).get('/api/streaming-games/most-viewed');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('id');
    });
  });

  describe('POST /api/streaming-games/most-viewed', () => {
    it('should save the most viewed game on Twitch', async () => {
      const res = await request(app).post('/api/streaming-games/most-viewed');

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('date');
    });
  });

  describe('GET /api/streaming-games/history-most-viewed', () => {
    it('should return all saved games', async () => {
      const res = await request(app).get('/api/streaming-games/history-most-viewed');

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
