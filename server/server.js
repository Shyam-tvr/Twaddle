import * as dotenv from 'dotenv' 
dotenv.config()
import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import axios from 'axios'
import http from 'http'
import {Server} from "socket.io";
import { SocketServer } from './socketServer.js'
import { auth } from './Middlewares/auth.js'

const app = express()
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({extended:false}))

const server = http.createServer(app)
const io = new Server(server);

io.on('connection', ( socket ) => {
  console.log(`user Connected : ${socket.id}`)  
})

import authRoute from './Routes/authRouter.js'
import userRoute from './Routes/userRouter.js' 
import postRoute from './Routes/postRouter.js'
import commentRoute from './Routes/commentRouter.js'
import notifyRoute from './Routes/notifyRoute.js'
import hashtagRoute from './Routes/hashtagRoute.js'

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/post',postRoute)
app.use('/api/comment',commentRoute)
app.use('/api/notify',notifyRoute)
app.use('/api/hashtag',hashtagRoute)

app.get('/getlocation', async (req, res) => {
  const input = req.query.input;
  const apiKey = process.env.LOCATION_API_KEY
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${input}`;

  try {
    const { data } = await axios.get(url);
    res.json(data.predictions);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

const URI = process.env.MONGODB_URL

mongoose.connect(URI)
.then(()=>console.log("Database Connected"))
.catch((error)=>console.log(error.message))

const port = process.env.PORT || 5000

app.listen(port,()=>console.log('server connected'))