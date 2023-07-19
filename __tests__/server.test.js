const app = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)

describe('server', () => {
  test('responds to /', async () => {
    const res = await request.get('/');
   expect(res.statusCode).toBe(200)
})
})

