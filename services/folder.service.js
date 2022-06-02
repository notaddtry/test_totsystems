import db from '../db.json'

let folders = db.folders
let messages = db.messages

class FolderService {
  async getAll() {
    return { folders }
  }
  async getOne(paramsId) {
    const folder = folders.find((folder) => folder.id === paramsId)

    if (!folder) {
      throw new Error('Папка не найдена')
    }

    const messagesInFolder = messages.filter(
      (message) => message.folder === folder.name
    )

    return { folder, messagesInFolder }
  }
  async create(name) {
    const newFolder = {
      name,
      id: Date.now().toString(),
      canBeEdited: true,
    }
    folders.push(newFolder)

    return { newFolder }
  }
  async update(req) {
    let searchFolder = folders.find((folder) => folder.id === req.params.id)
    const folderIndex = folders.findIndex(
      (folder) => folder.id === req.params.id
    )

    if (!searchFolder) {
      throw new Error('Папка не найдена!!!')
    }

    if (!searchFolder.canBeEdited) {
      throw new Error('Папка не может быть изменена!')
    }

    searchFolder = { ...searchFolder, ...req.body }
    folders.splice(folderIndex, 1, searchFolder)

    return { searchFolder }
  }
  async remove(paramsId) {
    const folderIndex = folders.findIndex((folder) => folder.id === paramsId)
    const folder = folders.find((folder) => folder.id === paramsId)

    if (!folder.canBeEdited) {
      throw new Error('Папка не может быть удалена!')
    }

    if (folderIndex === -1) {
      throw new Error('Папка не найдена')
    }

    folders.splice(folderIndex, 1)

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].folder === folder.name) {
        messages.splice(i, 1)
      } else {
        messages[i]
      }
    }

    return { paramsId }
  }
}

export const folderService = new FolderService()
