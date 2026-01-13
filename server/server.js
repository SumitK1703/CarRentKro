import express, { json } from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
const app=express()
// await connectDB();

//revision-Middlewares hain yeh
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>res.send("Server is ON"))
app.use('/api/user',userRouter);
app.use('/api/owner',ownerRouter);
app.use('/api/booking',bookingRouter);


const PORT=process.env.PORT|| 3000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT} `))
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("❌ Database connection failed. Server not started.", error);
        process.exit(1); // Exit process with failure code
    }
};

startServer();