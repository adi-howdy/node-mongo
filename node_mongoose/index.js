const mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');

const Dishes = require('./model/dishes');
const url = 'mongodb://localhost:27017/conFusion4';
const connect = mongoose.connect(url);


connect.then((db) => {
    console.log('conected to server');

    var newDish = Dishes({
        name: 'Uthappizza',
        description: 'test'
    });

    console.log('testeed11111');

    newDish.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.find({});
        })
       
        .then((dishes) => {
            console.log(dishes);

            return Dishes.remove();
        })
        
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        })

})
