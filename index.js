const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operation');


const url = 'mongodb://localhost:27017/conFusion';
const dbname = 'conFusion1';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('connected to server');
    const db = client.db(dbname);
    /* *****************************
   
    const collection = db.collection("dishes");
    collection.insertOne({"name":"Uthappizza", "description":"test"},
    (err, result) => {
        assert.equal(err,null);

        console.log("After insert:\n");
        console.log(result.ops);

        collection.find({}).toArray((err, docs) =>{
            assert.equal(err,null);

            console.log("Found:\n");
            console.log(docs);

            db.dropCollection("dishes", (err, result) => {
                    assert.equal(err,null)

                client.close();
            });
            
        });
    });
*************************************************/

    dboper.insertDocument(db, { name: "adi", description: "hello" }, "dishes", (result) => {
        console.log("Inserted document: " + result.ops);
        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("found document ", docs);


            dboper.updateDocument(db, { "name": "adi" }, { "name": "user" }, "dishes", (result) => {

                console.log("updated  ::::::: ", result.result);

                db.dropCollection("dishes", (result) => {
                    console.log("drop collecito", result);

                    client.close();
                    console.log("db closed");
                });
            });
        });
    });









});