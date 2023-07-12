const { MongoClient } = require('mongodb');
const clients = require('./clients');
const dotenv = require('dotenv');
dotenv.config();

describe('insert', () => {
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

    it('should insert a new user into the clients collection', async () => {
        const users = db.collection('clients');

        const mockUser = {
            id: 'some-user-id',
            firstName: "Suzie",
            lastName: "Brown",
            email: "suzieBrown@gmail.com",
            age: 25,
        }

        await users.insertOne(mockUser)

        const insertedUser = await users.findOne({ id: 'some-user-id' });

        expect(insertedUser).toEqual(mockUser)
    },
        
    it('should delete a user from the users collection', async () => {
        const users = db.collection('clients')
        await users.deleteMany({ id: 'some-user-id' })
        const deletedUser = await users.findOne({ id: 'some-user-id' });
        expect(deletedUser).toEqual(null)
    })
)})
