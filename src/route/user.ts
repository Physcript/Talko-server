import express from 'express'
import register from '../middleware/user/register'
import login from '../middleware/user/login'
import authenticate from '../middleware/user/authenticate'
import { Socket } from 'socket.io'

module.exports = (io: Socket) => {
  const con = require('../controller/user')(io) 
  const router = express.Router()

  router.post('/register',register,con.register)
  router.post('/login',login,con.login)
  router.get('/authenticate',authenticate, con.authenticate)

  return router
}
