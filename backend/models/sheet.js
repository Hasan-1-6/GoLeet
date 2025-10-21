import mongoose from "mongoose";

// use the leetcode num for quesID
const quesSchema = new mongoose.Schema({
    quesId : {
        type : Number,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    url : {
        type : String,
        required : true,
    },
    difficulty : {
        type : String,
        required : true,
    }
})

const sheetSchema = new mongoose.Schema({
    sheetId :{
        // generate by nanoid
        type : String,
        required : true,
    },
    userId : {
        //pull from req.user in backend
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    title : {
        //send from frontend
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
        default : ``,
    },
    numOfQues : {
        type : Number,
        required : true,
        default : 0,
    },
    easy : {
        type : Number,
        required : true,
        default : 0,
    },
    medium : {
        type : Number,
        required : true,
        default : 0,
    },
    hard : {
        type : Number,
        required : true,
        default : 0,
    },
    likes : {
        type : Number,
        required : true,
        default : 0,
    },
    ques : {
        type : [quesSchema],
        required : true,
        default : [],
    },
})

sheetSchema.index({title : 1})
sheetSchema.index({_id : -1})



const sheet = mongoose.model('Sheet', sheetSchema);
export default sheet;