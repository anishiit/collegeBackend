import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true
    },
    image :{
        type:String,
    },
     imageInfo:{
        type:Object,
    },
    collegeId:{
        type : mongoose.Schema.Types.ObjectId , ref:'College',
    },
    

},
{timestamps:true})

// const Event = mongoose.model('Event' , eventSchema);

export default eventSchema