import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    sheetsMade : {
        type : [String],
        required : true,
        default : [],
    }
})
const User = mongoose.model('User', userSchema);
export default User;