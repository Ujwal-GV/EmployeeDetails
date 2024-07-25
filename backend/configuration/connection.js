const mongoose = require("mongoose");

const connectMongoDB = async() => {
    try{
        const conn = await mongoose.connect("mongodb+srv://ujwalgowda2002v:iD4Ostt2YhnamRhV@userview.1xod5p9.mongodb.net/?retryWrites=true&w=majority&appName=userView");
        console.log("MongoDB connected");
    }
    catch(error){
        console.log(error);
    }
};

module.exports = { connectMongoDB };