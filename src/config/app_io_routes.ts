import User from '../model/User'
import { IUser } from '../interface/user'
import { ILobbyList } from '../interface/room'
import { Request,Response } from 'express'
import { Socket } from 'socket.io'


module.exports = async (app: any, io: Socket) => {
    
  const userController = require('../route/user')(io)
  const lobbyList: ILobbyList[] = []
  const Online = await User.find({ status: true })
  
  for( const user of Online ){
    const USER: ILobbyList = {
      _id: user._id,
      uid: user.uid,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }

    lobbyList.push(USER) 
 
  }
  
  io.on('connection',(socket) => {
    console.log('connected')
    
    socket.on('login', (user: any) => {

      const USER: ILobbyList[] = [{
        name: user.USER.name,
        _id: user.USER._id,
        email: user.USER.email,
        uid: user.USER.uid,
        createdAt: user.USER.createdAt,
        updatedAt: user.USER.updatedAt
      }]
      USER[0].socket_id = socket.id
      
      const isActiveUser = lobbyList.find( arr => { 
        if( arr.uid === USER[0].uid ){
          return arr 
        }
      })

      if(isActiveUser === undefined || isActiveUser === null) 
      {
        lobbyList.push(USER[0])
      }
      
      socket.broadcast.emit('lobbyList', { lobbyList })


    })

    app.use('/api',userController)

    app.use((req: Request, res: Response) => {
      res.status(404).json({
        message: 'Not found'
      })
    })
  })

  return
}


