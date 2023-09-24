import express from 'express'
import { auth } from '../Middlewares/auth.js'
import { hashtagController } from '../Controllers/hashTagController.js'
const router = express.Router()

router.get('/',auth,hashtagController.getHashtags)
router.post('/',auth,hashtagController.addHashtag)

export default router