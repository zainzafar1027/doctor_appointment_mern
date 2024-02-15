import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
 
dotenv.config()


const app = express()
const port = process.env.PORT;

const corsOption = {
    origin: true
}

app.get('/',(req,res)=>{
    res.send('Api is working')
})

// database connection
mongoose.set('strictQuery', false);
const connectDB = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://zafarzain544:zainzafar@cluster0.vzots6d.mongodb.net/?retryWrites=true&w=majority`, {
        })
        console.log('mongoDB database is connected')
    } catch (err) {
        console.log('mongoDB database is connection failed')
    }
}

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/doctors', doctorRoute) 
app.use('/api/v1/reviews', reviewRoute) 

app.listen(port,()=>{
    connectDB()
    console.log('server is running on port' + port)
})


