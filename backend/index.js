import express from 'express'
import authRoutes from './routes/auth.routes.js'
import mongoose from 'mongoose';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import friendsroutes from './routes/friends.routes.js';
import problemsroutes from './routes/problems.routes.js';
import contestroutes from './routes/contest.routes.js'
configDotenv();
const app = express();
app.listen(5000,()=>{
    console.log("Listening on PORT 5000");
})
mongoose.connect(process.env.DB_LINK).then(
    ()=>console.log("DataBase Connected")).catch((err)=>console.log(err)
);
app.use(
  cors({
    origin: "http://localhost:5173", //  Allow only your frontend URL
    credentials: true, //  Allow cookies/auth headers
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/auth',authRoutes);
app.use('/friend',friendsroutes);
app.use('/problems',problemsroutes);
app.use('/contest', contestroutes);
app.get("/" , (req,res)=>{
    console.log(req.body);
    res.send("cool");
})