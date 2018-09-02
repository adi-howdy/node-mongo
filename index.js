const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operation');


const url = 'mongodb://localhost:27017/conFusion';
const dbname = 'conFusion1';

MongoClient.connect(url).then((client) =>  {
    //assert.equal(err, null);
    console.log('connected to server');
    const db = client.db(dbname);
    dboper.insertDocument(db, { name: "adi", description: "hello" }, "dishes")
        .then((result) => {
        console.log("Inserted document: " + result.ops);
        return dboper.findDocuments(db, "dishes");})
         .then((docs) => {
            console.log("found document ", docs);
        return dboper.updateDocument(db, { "name": "adi" }, { "name": "user" }, "dishes")})
         .then((result) => {
            console.log("updated  ::::::: ", result.result);
        return dboper.findDocuments(db, "dishes");})
            .then((docs) => {
               console.log("found document ", docs);
        return db.dropCollection("dishes")}) 
        .then((result) => {
                    console.log("drop colleciton", result);

                    client.close();})
        .catch((err) => 
            console.log(err))
        }).catch((err) => console.log(err));