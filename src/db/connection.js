import mongoose, { model } from "mongoose";

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/collegeBackend';
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('error connecting to mongodb',error)

    }
}

export default connectDB;