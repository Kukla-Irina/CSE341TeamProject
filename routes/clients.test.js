const {MongoClient} = require('mongodb');
const clients = require('./clients');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.bakery);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const clients = db.collection('clients');

    const mockUser = {_id: '64909485818e12a88f758e6a', name: 'Marina'};
    await clients.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: '64909485818e12a88f758e6a'});
    expect(insertedUser).toEqual(mockUser);
  });
});

