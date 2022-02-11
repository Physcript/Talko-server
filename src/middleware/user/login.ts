
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '../../config/main'

import { chk_existing_email } from '../main'
import { IUser } from '../../interface/user'
import { Request,Response,NextFunction } from 'express'

const login = async (req: Request, res: Response, next: NextFunction) => {
  
  const { email,password } = req.body
  await chk_existing_email(req,res)
  const user: IUser = await res.locals.user

  if(user === null)
  {
    res.status(400).json({
      message: 'Incorrect email/password'
    })
    return
  }

  if(await chk_password(password,user!.password!))
  {

    res.status(400).json({
      message: 'Incorrect email/password'
    })
    return

  }

  const data = await generate_login_token(user)

  user.token = data.token 
  await user.save()

  res.locals.token = data.token 
  res.locals.user = data.user

  next()
}

const chk_password = async (arg1: string,arg2: string) => {

  const isMatch = await bcrypt.compare(arg1,arg2) 
  if( isMatch === false )
  {
    return true
  }

  return false
}

const generate_login_token = async (user: IUser) => {

  const newUser = {

    _id: user._id,
    email: user.email,
    uid: user.uid,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,

  }
  
  const token = await jwt.sign(newUser,`${config.TOKEN.LOGIN}`)

  const object = {

    user: newUser,
    token

  }
  
  return object 

}

export default login
