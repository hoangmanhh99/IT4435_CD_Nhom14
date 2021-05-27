const mongoose = require('mongoose');
const dotevn = require('dotenv/config')
const enviroment = require('./configs/index')
const URI = process.env.DB_CONNECTION;

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