import express from 'express'
import { userCtrl } from '../Controllers/userController.js'
import { auth } from '../Middlewares/auth.js'
const router = express.Router()

router.get('/search',auth ,userCtrl.searchUser)

router.get('/:id', auth, userCtrl.getUser)

router.patch('/', auth, userCtrl.updateUser)

router.patch('/follow/:id', auth, userCtrl.followUser)

router.get('/user/suggestions', auth, userCtrl.suggestionsUser)

export default router