//Import Dependencies
require('dotenv').config()

const mongoose = require('mongoose');
const db = mongoose.connection;
//Database connection
const MONGODB_URI = process.env.MONGODB_URI;

//Establish Connection
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
    );

db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));


//Export Connection
module.exports = mongoose