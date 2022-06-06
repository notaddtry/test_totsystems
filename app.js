import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import folderRouter from './routes/folder.routes.js'
import messagesRouter from './routes/message.routes.js'
import { fileURLToPath } from 'url'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json({ extended: true }))
app.use('/api/folders', folderRouter)
app.use('/api/messages', messagesRouter)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

let PORT = process.env.PORT || 4242

if (process.env.NODE_ENV === 'production') {
  PORT = process.env.PROD_PORT
}

async function start() {
  try {
    app.listen(PORT, () => console.log(`hello,world from ${PORT}`))
  } catch (e) {
    console.log('Server error', e.message)
    return
  }
}

start()
