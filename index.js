const express = require('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
const dotevn = require('dotenv/config')

// Import Routers

// const authRoute = require('./routers/Auth') ;

// Connect tto DB 
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true },
() => console.log('connected to db')) ;


// Middleware
app.use(express.json())


// Router Middlewares 

// app.use('/api/user',authRoute)


app.listen(3000, ()=> console.log('Server Up and running'));