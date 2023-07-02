import express from 'express'
import { notifyCtrl } from '../Controllers/notifyController.js'
import { auth } from '../Middlewares/auth.js'
const router = express.Router()

router.post('/', auth, notifyCtrl.createNotify)

router.delete('/:id', auth, notifyCtrl.removeNotify)

router.get('/', auth, notifyCtrl.getNotifies)

router.patch('/isReadNotify/:id', auth, notifyCtrl.isReadNotify)

router.delete('/delete/AllNotify', auth, notifyCtrl.deleteAllNotifies)

export default router