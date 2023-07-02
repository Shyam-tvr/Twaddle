import express from 'express'
import { commentCtrl } from '../Controllers/commentController.js'
const router = express.Router()
import { auth } from '../Middlewares/auth.js'

router.post('/', auth, commentCtrl.createComment)

router.patch('/:id', auth, commentCtrl.updateComment)

router.patch('/:id/like', auth, commentCtrl.likeComment)

router.delete('/:id', auth, commentCtrl.deleteComment)

router.put('/replycomment', auth, commentCtrl.replyComment)

export default router