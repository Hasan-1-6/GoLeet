import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    question_id :{
        type : String,
        required : true,
        unique : true,
    },
    difficulty : {
        type : String,
        required : true,
    }
})

const problem = mongoose.model('Problem', problemSchema);
export default problem;