const request = require('supertest');
const app = require('../app');

describe('POST endpoint', () => {
    it('fetch records', async () => {
        const data = await request(app).post('/').send({
            "minCount": 0,
            "maxCount": 50,
            "startDate": "2016-01-01",
            "endDate": "2016-01-30"
        })
        expect(data.statusCode).toEqual(200)
        expect(data.body).toMatchObject({ code: 0 })
        expect(data.body).toHaveProperty('records')
    })
})