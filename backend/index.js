import express from 'express';
import cors from 'cors';
import connectDB from './utils/connectDB.js';
import authroutes from './routes/user.js';
import apporoutes from './routes/appointment.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

if(process.env.NODE_ENV != "production"){
    dotenv.config();
}

const app = express();

const PORT = 8080;

connectDB();

app.use(cors({origin: process.env.FRONTEND_LINK, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/user', authroutes);
app.use('/api/appointment', apporoutes);

app.get('/', (req, res)=>{
    res.json({message: "Hello World"});
})

app.listen(PORT, () => {
    console.log(`Server is running on port 8080`);
});