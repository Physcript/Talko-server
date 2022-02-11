
import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string,
  email: string,
  uid: string,
  token?: string,
  password?: string,
  status: boolean,
  createdAt: Date,
  updatedAt: Date
}
