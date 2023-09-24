import express from 'express'
const router = express.Router()
import { authCtrl } from '../Controllers/authController.js'

router.post('/user',authCtrl.verifyUser)

router.post('/getotp',authCtrl.getOTP)

router.post('/verifyotp',authCtrl.verifyOTP)

router.post('/usernamevalid',authCtrl.usernameValid)

router.post('/register',authCtrl.register)

router.post('/login', authCtrl.login)

router.post('/logout', authCtrl.logout)

router.post('/forgotpassword',authCtrl.forgotPassword)

router.post('/refresh_token', authCtrl.generateAccessToken)

router.post('/verify_token',authCtrl.verifyToken)

router.post('/resetpassword/:id',authCtrl.resetPassword)

export default router