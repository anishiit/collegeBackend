import mongoose, { model } from "mongoose";

const COLLEGE_MONGODB_URI = process.env.COLLEGE_MONGODB_URI;
const connectDB = async () => {
    try {
        await mongoose.connect(COLLEGE_MONGODB_URI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('error connecting to mongodb')
        throw error
    }
}

export default connectDB;