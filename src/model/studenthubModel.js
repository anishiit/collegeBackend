import mongoose, { mongo } from "mongoose";
import { User } from "../db/connection.js";

const studenthubSchema = new mongoose.Schema({
    proposedBy : {
        type: {
            name : String, _id:mongoose.Schema.Types.ObjectId, email:String
        }
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