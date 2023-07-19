const { MongoClient } = require('mongodb');
const orders = require('./orders.test.js');
const dotenv = require('dotenv');
const { it } = require('@jest/globals');
dotenv.config();

describe('Orders', () => {
    let connection;
    let db;

    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('orders')
    });
    afterAll(async() => {
        await connection.close()
    })

    it('should insert a new order into the orders collection', async () => {
        const orders = db.collection('orders');

        const mockOrder = {
            number: "15",
            client: "Marina",
            type: "chocolate cake",
            date: "01.02.2023",
            payment: "1234654785671534"
        }

        await orders.insertOne(mockOrder)

        const insertedOrder = await orders.findOne({ number: "15" });

        expect(insertedOrder).toEqual(mockOrder)
    },
        
    it('should delete a order from the orders collection', async () => {
        const orders = db.collection('orders')
        await orders.deleteMany({ number: "15" })
        const deletedOrder = await orders.findOne({ number: "15" });
        expect(deletedOrder).toEqual(null)
    })
)})
