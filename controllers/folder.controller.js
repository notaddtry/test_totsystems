import { folderService } from '../services/folder.service.js'

class FolderController {
  async getAll(_, res) {
    try {
      const data = await folderService.getAll()

      res.json(data.folders)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Папка не найдена!' })
    }
  }
  async getOne(req, res) {
    try {
      const data = await folderService.getOne(req.params.id)
      const { folder, messagesInFolder } = data

      res.json({ ...folder, messagesInFolder })
    } catch (e) {
      res.status(400).json(e.message || { message: 'Папка не найдена!' })
    }
  }
  async create(req, res) {
    try {
      const data = await folderService.create(req.body.name)
      res.json(data.newFolder)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Папка не создана!' })
    }
  }
  async update(req, res) {
    try {
      const data = await folderService.update(req)

      res.json(data.searchFolder)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Папка не найдена!' })
    }
  }
  async remove(req, res) {
    try {
      const data = await folderService.remove(req.params.id)

      res.json(data.paramsId)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Папка не найдена!' })
    }
  }
}

export const folderController = new FolderController()
