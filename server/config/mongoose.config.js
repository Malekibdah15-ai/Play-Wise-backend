const mongoose  = require('mongoose')
require('dotenv').config()
const dbName = process.env.DB;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;


const uri = `mongodb+srv://${username}:${pw}@cluster0.oo5frow.mongodb.net/${dbName}?appName=Cluster0`;

mongoose.connect(uri)
.then(() => console.log(" Established a connection to the database"))
.catch(err => console.log(" MongoDB connection error:", err));












    