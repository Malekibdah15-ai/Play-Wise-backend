require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

const aiRoutes = require("./routes/airoutes.js");

const app = express();
require('./config/mongoose.config.js'); 
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/api/ai', aiRoutes);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

