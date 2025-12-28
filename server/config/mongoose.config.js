const mongoose  = require('mongoose')
require('dotenv').config()
const dbName = process.env.Db;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;

// this is malek route for the db 
// const uri = `mongodb+srv://${username}:${pw}@cluster0.oo5frow.mongodb.net/${dbName}?appName=Cluster0`;



// and this is anas route for conneiction
const uri = `mongodb+srv://${username}:${pw}@testc.hrnc0an.mongodb.net/${dbName}?appName=TestC`

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Established a connection to the database");
  } catch (err) {
    console.log("Something went wrong when connecting to the database", err);
  }
}

connectDB();
