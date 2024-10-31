import mongoose, { model } from "mongoose";
import userSchema from "../model/userModel.js";
import collegeSchema from "../model/collegeModel.js";
import eventSchema from "../model/eventModel.js";
import studenthubSchema from "../model/studenthubModel.js";

const collegeDbUri = process.env.COLLEGE_MONGODB_URI;
const userDbUri = process.env.USER_MONGODB_URI;

let College;
let User;
let Event;
let Studenthub;
export async function connectDB() {
    try {
        // Create connections for both databases
        const userDbConnection = mongoose.createConnection(userDbUri);
        console.log('User Database connected successfully');

        const collegeDbConnection = mongoose.createConnection(collegeDbUri);
        console.log('College Database connected successfully');

        // console.log("userDbConnectionResponse : ", userDbConnection)
        // console.log("chatDbConnectionResponse : ", chatDbConnection)
        User = userDbConnection.model('User', userSchema);
        College = collegeDbConnection.model("College" , collegeSchema);
        Event = collegeDbConnection.model("Event" , eventSchema);
        Studenthub = collegeDbConnection.model("StudentHub" , studenthubSchema);

        if(!User && !College && !Event){
           throw "Models not connected!"
        }

        return { userDbConnection, collegeDbConnection };

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

export {College , User, Event, Studenthub}