import mongoose from "mongoose";

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database connection established`)
    }
    catch(err){
        console.log('Could not connect to database')
        throw err
    }
}

export default connectDB;
