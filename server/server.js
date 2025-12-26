require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const aiRoutes = require('./routes/airoutes');
const dealsRoutes = require('./routes/dealroutes');
const challengesRoutes = require('./routes/challengeroutes');
const chatFilterRoutes = require('./routes/chatroutes');
const usersRoutes = require('./routes/userRoute.js');
// const { default: mongoose } = require('mongoose');
const app = express();
require('./config/mongoose.config.js'); 
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/api/ai', aiRoutes);
app.use('/api/deals', dealsRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/chat-filter', chatFilterRoutes);
app.use('/api/users', usersRoutes);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})



const User = require('./model/User.js');


// const create = async() =>{

//     await User.create({
//     "userName":"anasHawwash",
//     "email":"anas@gmail.com",
//     "password":"12312376890"
// })

// } 


// create();