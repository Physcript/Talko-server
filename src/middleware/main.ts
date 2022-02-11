import User from '../model/User'
import { Request,Response,NextFunction } from 'express'

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
