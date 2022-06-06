const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const folderRouter = require('./routes/folder.routes.js')
const messagesRouter = require('./routes/message.routes.js')

const app = express()
const PORT = process.env.PORT || 4242

app.use(express.json({ extended: true }))
app.use(cors())
app.use('/api/folders', folderRouter)
app.use('/api/messages', messagesRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
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
