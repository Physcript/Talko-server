import User from '../model/User'
import config from '../config/main'
import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express'
import { IUser } from '../interface/user'

export const chk_valid_name = async (name: string) => {
 
  const user = await User.findOne({ name })

  if(user)
  {
    return true
  }
  return false
}

export const chk_valid_email = async (email: string) => {

  const user = await User.findOne({ email })
  if(user){
    return true
  }
  return false

}

export const chk_existing_email = async (req: Request, res:Response) => {
  const { email } = req.body
  
  const user = await User.findOne({ email })

  res.locals.user = user
  return
}

export const chk_valid_token = async (token: string , res: Response) => {

  const decode = await jwt.verify(token,`${config.TOKEN.LOGIN}`, (error,decode) => {
    
    if(error)
    {
      return null 
    }
 
    return decode

  })
  
  res.locals.user = decode

}


