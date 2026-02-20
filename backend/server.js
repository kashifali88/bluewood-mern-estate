import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import postRoute from '../backend/routes/postRoute.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import testRoute from './routes/testRoute.js'
import userRoute from './routes/userRoute.js';
dotenv.config()
const server = express();


// MONGODB CONNECTION //
const connect = async () => {
    try { 
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Successfully connected to MongoDB");
        
        
    } catch (error) {
        console.error("MongoDB connection failed", error.message);
    }
    
}

//middlewares
server.use(cors({
  origin: "http://localhost:3000",  
  credentials: true, 
}))
server.use(express.json())
server.use(cookieParser())


//api endpoints //
// server.use('/api/auth/register')
server.use('/api/posts',postRoute);
server.use('/api/auth',authRoute);
server.use('/api/test',testRoute);
server.use('/api/users',userRoute);
server.use('/api/posts',postRoute);

//error handling middleware//
server.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong";

    res.status(status).json({
        success: false,
        status,
        message,
        stack: err.stack
    })
})



server.listen(8081,()=>{
console.log('connected to backend');
connect()

})