const mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');

const Dishes = require('./model/dishes');
const url = 'mongodb://localhost:27017/conFusion_sun';
const connect = mongoose.connect(url);


connect.then((db) => {
    console.log('conected to server');

  Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
        .then((dish) => {
            console.log(dish);

            return Dishes.findByIdAndUpdate(dish._id,{
                $set:{description: 'Updated test'}
            },  {new: true});
        })
       
        .then((dishes) => {
            console.log(dishes);

            dishes.comments.push({
                rating: 5,
                comment:'testing comments insert',
                author: 'adi'
            })
            return dishes.save();
        })
        .then((dish) => {
            console.log(dish);
        

            return Dishes.remove();
        })
        
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        })

})
