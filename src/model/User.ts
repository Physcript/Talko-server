import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true
  },
  name: String,
  password: String,
  status: {
    type: Boolean,
    default: false
  },
  uid: String,
  token: String

},{ timestamps: true })

const User = mongoose.model('User', userSchema)
export default User
