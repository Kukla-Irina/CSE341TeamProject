const { MongoClient } = require('mongodb');
const cakes = require('./cakes.test.js');
const dotenv = require('dotenv');
const { it } = require('@jest/globals');
dotenv.config();

describe('Cakes', () => {
    let connection;
    let db;

    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('cakes')
    });
    afterAll(async() => {
        await connection.close()
    })

    it('should insert a new cake into the cakes collection', async () => {
        const cakes = db.collection('cakes');

        const mockCake = {
                flavor: "chocolate",
                  frosting: "caramel",
                  toppings: [
                    {
                      topping1: "caramel",
                      topping2: "strawberries"
                    }
                  ],
                  numberOfLayers: "5",
                  nutrients: [
                    {
                      kcal: 555,
                      fat: 56,
                      sugar: 76
                    }
                  ]
                
        }

        await cakes.insertOne(mockCake)

        const insertedCake = await cakes.findOne({ flavor: "chocolate" });

        expect(insertedCake).toEqual(mockCake)
    },
        
    it('should delete a cake from the cakes collection', async () => {
        const cakes = db.collection('cakes')
        await cakes.deleteMany({ flavor: "chocolate" })
        const deletedCake = await cakes.findOne({ flavor: "chocolate" });
        expect(deletedCake).toEqual(null)
    })
)})
