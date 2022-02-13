
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './config/main'


import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: 'http://localhost:3000' } })
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PATCH')
  res.setHeader('Access-Control-Allow-headers', 'X-Requested-With,Content-Type,token')
  res.setHeader('Access-Control-Allow-credentials', 'true')
  next()
})

// 
require('./config/app_middleware')(app)
//
require('./config/app_io_routes')(app,io)

//
mongoose
  .connect(`${config.DATABASE.URL}`,config.DATABASE.OPTIONS)
  .then(() => console.log('Database connected'))
  .catch((error) => console.log('Network error', error)) 

httpServer.listen(`${config.SERVER.PORT}` , () => { 
  console.log('Server connected')
})
