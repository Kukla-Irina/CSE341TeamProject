const { MongoClient } = require('mongodb');
const sweets = require('./sweets.test.js');
const dotenv = require('dotenv');
const { it } = require('@jest/globals');
dotenv.config();

describe('Sweets', () => {
    let connection;
    let db;

    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('sweets')
    });
    afterAll(async() => {
        await connection.close()
    })

    it('should insert a new sweet into the sweets collection', async () => {
        const sweets = db.collection('sweets');

        const mockSweet = {
            type: "banana cookie",
            quantity: 55
        }

        await sweets.insertOne(mockSweet)

        const insertedSweet = await sweets.findOne({ type: "banana cookie" });

        expect(insertedSweet).toEqual(mockSweet)
    },
        
    it('should delete a sweet from the sweets collection', async () => {
        const sweets = db.collection('sweets')
        await sweets.deleteMany({ type: "banana cookie" })
        const deletedSweet = await sweets.findOne({ type: "banana cookie" });
        expect(deletedSweet).toEqual(null)
    })
)})
