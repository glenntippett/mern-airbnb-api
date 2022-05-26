import 'dotenv/config'
import express from 'express'
import apolloServer from './graphql'
import pkg from 'mongoose'
const { connect } = pkg

const startServer = async () => {
  const app = express()

  await apolloServer.start()

  apolloServer.applyMiddleware({ app: app })

  app.use((req, res) => {
    res.send('Hello from express apollo server')
  })

  switch(process.env.NODE_ENV) {
    case 'dev':
      connect(process.env.LOCAL_URL)
        .then(() => console.log('✅ Mongoose dev connected'))
        .catch(err => console.error(err))
      break
    case 'prod':
      const options = {
        dbName: process.env.MONGODB_DB,
        user: process.env.MONGODB_USER,
        pass: process.env.MONGODB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
      connect(process.env.MONGODB_URI, options)
        .then(() => console.log('✅ Mongoose prod connected'))
        .catch(err => console.error(err))
      break
    default:
      console.error('❌ Error connecting to Mongoose')
  }

  const PORT = process.env.PORT
  try {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  } catch (err) {
    console.error(`❌ Error connecting to port ${PORT}: ${err}`)
  }
}

startServer().catch(err => console.error(err))
