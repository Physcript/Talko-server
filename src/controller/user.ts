import { Request,Response } from 'express'
import { Socket } from 'socket.io'

module.exports = (io: Socket) => {
  const con: any = {}
  
  con.register = ((req: Request, res: Response) => {

    res.status(200).json({
      message: 'created'
    })
    return

  })

  con.login = ((req: Request, res: Response) => {

    res.status(200).json({
      message: {
        user: res.locals.user,
        token: res.locals.token
      }
    })

    res.locals.user = undefined
    res.locals.token = undefined

    return
  })

  return con
}
