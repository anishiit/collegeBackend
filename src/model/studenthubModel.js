import mongoose from "mongoose";

const studenthubSchema = new mongoose.Schema({
    proposedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"  
    },
    collegeId:{
        type : mongoose.Schema.Types.ObjectId ,
        ref:'College',
    },
    title : {
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    implementation : {
        type:String
    },
    status:{
        type:String,
        default:"Under Review"
    },
    file:{
        type:String, // string url
    }
} , {
    timestamps : true
})

export default studenthubSchema