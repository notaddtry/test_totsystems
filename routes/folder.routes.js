const Router = require('express')
const folderController = require('../controllers/folder.controller.js')

const router = Router()

router.get('/', folderController.getAll)

router.get('/:id', folderController.getOne)

router.post('/', folderController.create)

router.put('/:id', folderController.update)

router.delete('/:id', folderController.remove)

export default router
