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
    college:{
        type : mongoose.Schema.Types.ObjectId , ref:'College',

    },
    

},
{timestamps:true})

export default mongoose.model('Event'  , eventSchema);