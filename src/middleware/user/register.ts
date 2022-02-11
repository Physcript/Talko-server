import { Request,Response,NextFunction } from 'express'
import User from '../../model/User'
import validator from 'validator'
import bcrypt from 'bcrypt'
import { chk_valid_name,chk_valid_email } from '../main'

const register = async (req:Request, res:Response, next: NextFunction) => {
  const { email,name,password,confirmPassword } = req.body
  
  if(chk_empty(email))
  {
    res.status(400).json({
      message: 'Email required'
    })
    return
  }
  
  if(chk_empty(name))
  {
    res.status(400).json({
      message: 'Name required'
    }) 
    return
  }

  if(chk_empty(password))
  {
    res.status(400).json({
      message: 'Password required'
    }) 
    return
  }
   
  if(chk_empty(confirmPassword))
  {
    res.status(400).json({
      message: 'Confirn password required'
    }) 
    return
  }
       
  if(await chk_valid_name(name))
  {
    res.status(400).json({
      message: 'Name already exist'
    })
    return
  }
  
  if(chk_password_length(password))
  {
    res.status(400).json({
      message: 'Password is too short'
    })
    return

  }

  if(chk_password_valid(password))
  {
    res.status(400).json({
      message: 'Invalid password no space allowed'
    })
    return 
  }

  if(chk_confirm_password_valid(confirmPassword))
  {
    res.status(400).json({
      message: 'Invalid confirm password no space allowed'
    })
    return
  }

  if(chk_password_match(password,confirmPassword))
  {
    res.status(400).json({
      message: 'Password not match'
    })
    return
  } 

  if(await chk_valid_email(email))
  {
    res.status(400).json({
      message: 'Email already exists'
    })
    return
  }

  if(chk_invalid_email(email))
  {
    res.status(400).json({
      message: 'Invalid email'
    })
    return
  }

  const encrypt = await encrypt_password(password)
  const uid = await generate_uid(email)
  
  const user = new User({
    name,
    email,
    password: encrypt,
    uid
  })

  await user.save() 

  next()
}

const chk_empty = (arg1: string) => {
  if(arg1.trim() === '')
  {
    return true
  }
  return false
}

const chk_password_length = (arg1: string) => {
  if(arg1.trim().length <= 5)
  {
    return true
  }
  return false
}

const chk_password_valid = (arg1: string) => {
  if(arg1.includes(' '))
  {
    return true
  }
  return false
}

const chk_confirm_password_valid = (arg1: string) => {
  if(arg1.includes(' '))
  {
    return true
  }
  return false
}

const chk_password_match = (arg1: string,arg2: string) => {
  if(arg1.trim() !== arg2.trim())
  {
    return true
  }
  return false
}

const chk_invalid_email = (arg1: string) => {
  if( !validator.isEmail(arg1) )
  {
    return true
  }
  return false
}


const encrypt_password = async (arg1: string) => {
  return await bcrypt.hash(arg1,8)
}

const generate_uid = (arg1: string) => {
  const data = arg1.split('@')
  return data[0]
}

export default register
