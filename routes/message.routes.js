import { Router } from 'express'
import db from '../db.json'

const folders = db.folders
const messages = db.messages

const router = Router()

router.get('/', async (req, res) => {
  try {
    let fetchedMessages = messages

    if (req.query.search) {
      fetchedMessages = messages.filter((message) =>
        message.body.includes(req.query.search)
      )
    }

    res.json(fetchedMessages)
  } catch (e) {
    res.status(400).json({ message: 'Сообщения не найдены!' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const message = messages.find((message) => message.id === req.params.id)
    message.isRead = true

    if (!message) {
      return res.json({ message: 'Сообщение не найдено!' })
    }

    res.json(message)
  } catch (e) {
    res.status(400).json({ message: 'Сообщение не найдено!' })
  }
})

router.put('/:id/read', async (req, res) => {
  try {
    const message = messages.find((message) => message.id === req.params.id)
    message.isRead = true

    if (!message) {
      return res.json({ message: 'Сообщение не найдено!' })
    }

    res.json(message)
  } catch (e) {
    res.status(400).json({ message: 'Сообщение не найдено!' })
  }
})

router.put('/:id/mark', async (req, res) => {
  try {
    const message = messages.find((message) => message.id === req.params.id)
    message.isMarked = true

    if (!message) {
      return res.json({ message: 'Сообщение не найдено!' })
    }

    res.json(message)
  } catch (e) {
    res.status(400).json({ message: 'Сообщение не найдено!' })
  }
})

router.put('/:id/favorite', async (req, res) => {
  try {
    const message = messages.find((message) => message.id === req.params.id)
    message.isFavorite = true

    if (!message) {
      return res.json({ message: 'Сообщение не найдено!' })
    }

    res.json(message)
  } catch (e) {
    res.status(400).json({ message: 'Сообщение не найдено!' })
  }
})

export default router
