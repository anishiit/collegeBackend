import mongoose, { Schema } from "mongoose";


const collegeSchema = new Schema({
    name : {type : String ,required:true},
    plan : {
        type:String ,
        enum : ['free' ,'standard' , 'premium'],
        required : true
    },
    phone:{type: String,required : true},

    email:{type : String ,required : true},

    password: {type: String,required: true },

    website: { type: String, required: true },

    linkedin: { type: String, required: true },

    isVerified:{type: Boolean,default: false},

    isBlocked:{type: Boolean,default: false},
},{
    timestamps : true
});
// const College = mongoose.model('College', collegeSchema);

export default collegeSchema