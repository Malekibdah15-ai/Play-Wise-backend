require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const http = require('http'); // 1. Added HTTP module
const { Server } = require("socket.io"); // 2. Added Socket.io

const app = express();
const server = http.createServer(app); // 3. Wrap app in server

// Routes imports
const aiRoutes = require('./routes/airoutes');
const dealsRoutes = require('./routes/dealroutes');
const challengesRoutes = require('./routes/challengeroutes');
const chatFilterRoutes = require('./routes/chatroutes');
const usersRoutes = require('./routes/userRoute.js');
const GenerRoutes = require('./routes/Gener.js');
const MesRoutes = require('./routes/message.js')

require('./config/mongoose.config.js'); 

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// API Routes
app.use('/api/messages',MesRoutes)
app.use('/api/Gener', GenerRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/deals', dealsRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/chat-filter', chatFilterRoutes);
app.use('/api/users', usersRoutes);


// this isf for socket dont touch 
const io = new Server(server, { cors: { origin: "*" } });

require('./sockets/chat.js')(io); 

server.listen(8000, () => {
    console.log(" Server running on Port 8000 (API + Sockets)")
})