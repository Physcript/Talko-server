
import { Request,Response } from 'express'
import { Socket } from 'socket.io'


module.exports = (app: any, io: Socket) => {
    
  const userController = require('../route/user')(io)

  io.on('connection',(socket) => {
    console.log('connected')

    app.use('/api',userController)

    app.use((req: Request, res: Response) => {
      res.status(404).json({
        message: 'Not found'
      })
    })
  })

  return
}


