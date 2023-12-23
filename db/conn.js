const mongoose = require('mongoose')
require("dotenv").config();

const connectDB = async function () {
    try{
        console.log('initiating connection to mongodb...');
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to mongodb::', conn.connection.host);
    } catch(error) {
        console.log('error', error);
    }
}

module.exports = connectDB;