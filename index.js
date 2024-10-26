import "dotenv/config"
import express from 'express';
import cors from 'cors';
import {connectDB} from './src/db/connection.js'
import {collegeRouter} from './src/routes/collegeRoutes.js'
import eventRouter from "./src/routes/eventRoutes.js";


const app = express();
const PORT = process.env.PORT || 5000;

connectDB()
.then(()=>{
    app.listen(PORT ,()=>{
        console.log(`server is running on port ${PORT}`)
    })
})

.catch((error)=>{
    console.log(error)
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/' , (req,res)=>{
    res.send("college Backend is running");
})
// Routes
app.use('/college' ,collegeRouter);
app.use('/event' ,eventRouter);
