import mongoose, { Schema } from "mongoose";


const collegeSchema = new Schema({
    name : {
        type : String ,
        required:true
    },
    plan : {
        type:String ,
        enum : ['free' ,'standard' , 'premium'],
        required : true
    },
    phone:{
        type: String,
        required : true
    },
    email:{
        type : String ,
        required : true
    },
    password: {
         type: String,
          required: true },
  createdAt: { 
    type: Date,
     default: Date.now },
    
     website: { type: String, required: true },
     linkedin: { type: String, required: true },

});
export default mongoose.model('College', collegeSchema);