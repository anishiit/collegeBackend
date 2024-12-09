import mongoose, { Schema } from "mongoose";

const featuredAlumniSchema = new Schema({
        name:{type:String, default:""},
        designation:{type:String, default:""},
        description:{type:String, default:""},
        image:{type:String, default:""},
})

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

    featuredAlumni:[{
      type: featuredAlumniSchema
    }
    ]
},{
    timestamps : true
});
// const College = mongoose.model('College', collegeSchema);

export default collegeSchema
