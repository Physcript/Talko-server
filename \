import { NextFunction, Request, Response } from "express"
import User from '../../model/User' 
import jwt from 'jsonwebtoken'

import { chk_valid_token } from "../main"
import { IUser } from "../../interface/user"

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  let  token = `${req.headers.token}` || '' 
  await chk_valid_token(token,res)
  
  
  if( res.locals.user == null ) 
  {
    res.status(400).json({
      message: 'Unauthorized'
    })
    return
  }  
  
  const user = await User.findOne({ uid: res.locals.user!.uid })
  user.status = true
  await user.save()  

  next()
}



export default authenticate 
