const mongoose = require("mongoose");

const connectMongoDB = async() => {
    try{
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/t_Employee")
        console.log("MongoDB connected");
    }
    catch(error){
        console.log(error);
    }
};

module.exports = { connectMongoDB };