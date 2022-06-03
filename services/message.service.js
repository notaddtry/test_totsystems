import db from '../db.json'

let folders = db.folders
let messages = db.messages

class MessageService {
  async getAll(s) {
    let fetchedMessages = messages
    let message

    if (s) {
      fetchedMessages = messages.filter((message) => message.body.includes(s))
    }

    return { fetchedMessages }
  }
  async getOne(paramsId) {
    return this.findMessage('isRead', paramsId)
  }
  async addToMarked(paramsId) {
    return this.findMessage('isMarked', paramsId)
  }
  async addToFavorite(paramsId) {
    return this.findMessage('isFavorite', paramsId)
  }

  findMessage = (paramToFind, paramsId) => {
    const message = messages.find((message) => message.id === paramsId)
    message[paramToFind] = true

    if (!message) {
      throw new Error('Сообщение не найдено!')
    }

    return { message }
  }
}

export const messageService = new MessageService()
