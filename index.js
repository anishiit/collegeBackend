import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/db/connection.js'
import {collegeRouter} from './src/routes/collegeRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());

app.get('/' , (req,res)=>{
    res.send("college Backend is running");
})
app.use('/college' ,collegeRouter);

app.listen(PORT ,()=>{
    console.log(`server is running on port ${PORT}`)
})