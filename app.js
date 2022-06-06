import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import folderRouter from './routes/folder.routes.js'
import messagesRouter from './routes/message.routes.js'
dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.json({ extended: true }))
app.use(cors())
app.use('/api/folders', folderRouter)
app.use('/api/messages', messagesRouter)
// notaddtry-mail.vercel.app
// "homepage": "https://test-totsystems.vercel.app",

// ,
//     {
//       "src": "./client/build",
//       "use": "@vercel/static"
//     }

// ,
//   "rewrites": [
//     {
//       "source": "/(.*)",
//       "destination": "/app.js"
//     }
//   ]

let PORT = process.env.PORT || 4242

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client', 'build')))

//   app.get('*', (_, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })

//   PORT = process.env.PROD_PORT
// }
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

PORT = process.env.PROD_PORT

async function start() {
  try {
    app.listen(PORT, () => console.log(`hello,world from ${PORT}`))
  } catch (e) {
    console.log('Server error', e.message)
    return
  }
}

start()
