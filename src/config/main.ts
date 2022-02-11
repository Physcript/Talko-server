

require('dotenv').config()

export default {
  SERVER: {
    HOST: 'localhost',
    PORT: 1337
  },
  DATABASE: {
    URL: 'mongodb://127.0.01/social',
    OPTIONS: {
      wtimeoutMS: 50000,
      maxPoolSize: 50,
      useUnifiedTopology: true
    }
  },
  TOKEN: {
    LOGIN: process.env.LOGIN_TOKEN 
  }

}
