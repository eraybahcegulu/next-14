const mongoose = require("mongoose");

const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        mongoose.Promise = global.Promise;
        console.log("connected to mongodb");
    } catch(error){
        console.log("error while connecting to mongodb");
    }

}

export default connectMongoDB;