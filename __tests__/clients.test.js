const { MongoClient } = require('mongodb');
const clients = require('./clients.test.js');
const dotenv = require('dotenv');
const { it } = require('@jest/globals');
dotenv.config();

describe('Clients', () => {
    let connection;
    let db;

    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('clients')
    });
    afterAll(async() => {
        await connection.close()
    })

    it('should insert a new client into the clients collection', async () => {
        const clients = db.collection('clients');

        const mockClient = {
            firstName: "Anna",
            address: "best place",
            email: "anna@mail.ru",
            phone: "89093457534",
            lastName: "Ivanova"
        }

        await clients.insertOne(mockClient)

        const insertedClient = await clients.findOne({ phone: '89093457534' });

        expect(insertedClient).toEqual(mockClient)
    },
        
    it('should delete a client from the clients collection', async () => {
        const clients = db.collection('clients')
        await clients.deleteMany({ phone: '89093457534' })
        const deletedClient = await clients.findOne({ phone: '89093457534' });
        expect(deletedClient).toEqual(null)
    })
)})
