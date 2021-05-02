const mongoose = require('mongoose');

const enviroment = require('./configs/index')
const URI = `mongodb+srv://${enviroment.MONGO_USER}:${enviroment.MONGO_PASSWORD}@cluster-0.9towh.mongodb.net/nhac14?retryWrites=true&w=majority`;

 var connectDB = async () => {
     await mongoose.connect(URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
        }, (err) => {
        if(err){
            console.log("error can not connect!!!");
            throw err;
        }
        console.log("------------------Connected mongo Atlas!----------------------".blue.bold);
    })
 };

 module.exports = connectDB;