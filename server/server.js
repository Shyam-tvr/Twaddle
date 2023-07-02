import * as dotenv from 'dotenv' 
dotenv.config()
import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }));
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({extended:false}))

import authRoute from './Routes/authRouter.js'
import userRoute from './Routes/userRouter.js' 
import postRoute from './Routes/postRouter.js'
import commentRoute from './Routes/commentRouter.js'
import notifyRoute from './Routes/notifyRoute.js'

import {Server} from "socket.io";
import { SocketServer } from './socketServer.js'
const io = new Server(8000);
io.on('connection', socket => {
    SocketServer(socket)
})

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/post',postRoute)
app.use('/api/comment',commentRoute)
app.use('/api/notify',notifyRoute)

const URI = process.env.MONGODB_URL

mongoose.connect(URI)
.then(()=>console.log("Database Connected"))
.catch((error)=>console.log(error.message))

const port = process.env.PORT || 5000

app.listen(port,()=>console.log('server connected'))