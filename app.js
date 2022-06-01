import express from 'express'
import dotenv from 'dotenv'
import folderRouter from './routes/folder.routes.js'
import messagesRouter from './routes/message.routes.js'
dotenv.config()

const app = express()

app.use(express.json({ extended: true }))
app.use('/api/folders', folderRouter)
app.use('/api/messages', messagesRouter)

const PORT = process.env.PORT || 4242

async function start() {
  try {
    app.listen(PORT, () => console.log('hello,world'))
  } catch (e) {
    console.log('Server error', e.message)
    return
  }
}

start()
