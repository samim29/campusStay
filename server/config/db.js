const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    }catch(err){
        console.log("Error In Database Connection", err);
    }
};

module.exports = connectDB;