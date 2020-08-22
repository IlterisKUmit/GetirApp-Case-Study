import {test} from "@jest/globals";

const {MongoClient} = require('mongodb');

const request = require("supertest");
const app = require("../app");

global.__MONGO_URI__ = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getircase-\n" +
    "study?retryWrites=true";
global.__MONGO_DB_NAME__ = "getir-case-study";

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
        });
        db = await connection.db(global.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });

    it('should insert a doc into collection', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', name: 'testUser'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });

});

describe('Test the db method', () => {
    beforeAll(() => {
        mongoDB.connect();
    });

    afterAll((done) => {
        mongoDB.disconnect(done);
    });
});

describe("Test the root path for localhost", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(302);
    });
});

describe("Test the /getir url for localhost", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get("/getir");
        expect(response.statusCode).toBe(200);
    });
});