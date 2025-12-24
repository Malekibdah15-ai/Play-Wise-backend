require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const aiRoutes = require('./routes/airoutes');
const dealsRoutes = require('./routes/dealroutes');
const challengesRoutes = require('./routes/challengeroutes');
const chatFilterRoutes = require('./routes/chatroutes');
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
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

