import { Router } from 'express'
import db from '../db.json'

let folders = db.folders
let messages = db.messages

const router = Router()

router.get('/', async (req, res) => {
  try {
    res.json(folders)
  } catch (e) {
    res.status(400).json({ message: 'Папка не найдена!' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const folder = folders.find((folder) => folder.id === req.params.id)
    const messagesInFolder = messages.filter(
      (message) => message.folder === folder.name
    )

    res.json({ ...folder, messagesInFolder })
  } catch (e) {
    res.status(400).json({ message: 'Папка не найдена!' })
  }
})

router.post('/', async (req, res) => {
  try {
    const newFolder = {
      ...req.body,
      id: Date.now().toString(),
      canBeEdited: true,
    }
    folders.push(newFolder)
    res.json(newFolder)
  } catch (e) {
    res.status(400).json({ message: 'Папка не создана!' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    let searchFolder = folders.find((folder) => folder.id === req.params.id)
    const folderIndex = folders.findIndex(
      (folder) => folder.id === req.params.id
    )

    if (!searchFolder) {
      return res.status(400).json({ message: 'Папка не найдена!' })
    }

    if (!searchFolder.canBeEdited) {
      return res.status(400).json({ message: 'Папка не может быть изменена!' })
    }

    searchFolder = { ...searchFolder, ...req.body }
    folders.splice(folderIndex, 1, searchFolder)

    res.json(searchFolder)
  } catch (e) {
    res.status(400).json({ message: 'Папка не найдена!' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const folderIndex = folders.findIndex(
      (folder) => folder.id === req.params.id
    )
    const folder = folders.find((folder) => folder.id === req.params.id)

    if (folderIndex === -1) {
      return res.status(400).json({ message: 'Папка не найдена!' })
    }

    folders.splice(folderIndex, 1)

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].folder === folder.name) {
        messages.splice(i, 1)
      } else {
        messages[i]
      }
    }

    res.json({ message: 'Папка удалена!' })
  } catch (e) {
    res.status(400).json({ message: 'Папка не найдена!' })
  }
})

export default router
