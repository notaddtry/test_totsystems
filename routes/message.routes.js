import { Router } from 'express'
import { messageController } from '../controllers/message.controller.js'

const router = Router()

router.get('/', messageController.getAll)

router.get('/:id', messageController.getOne)

router.put('/:id/mark', messageController.addToMarked)

router.put('/:id/favorite', messageController.addToFavorite)

export default router
