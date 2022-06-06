const messageService = require('../services/message.service.js')

class MessageController {
  async getAll(req, res) {
    try {
      const data = await messageService.getAll(req.query.s)

      res.json(data.fetchedMessages)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Сообщения не найдены!' })
    }
  }
  async getOne(req, res) {
    try {
      const data = await messageService.getOne(req.params.id)

      res.json(data.message)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Сообщение не найдено!' })
    }
  }

  async addToMarked(req, res) {
    try {
      const data = await messageService.addToMarked(req.params.id)

      res.json(data.message)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Сообщение не найдено!' })
    }
  }
  async addToFavorite(req, res) {
    try {
      const data = await messageService.addToFavorite(req.params.id)

      res.json(data.message)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Сообщение не найдено!' })
    }
  }
}

export const messageController = new MessageController()
