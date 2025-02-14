import express from 'express'
import controllers from './controllers/index.mjs'

const authRouter = express.Router()

authRouter.post('/login', controllers.auth.login)
authRouter.post('/logout', controllers.auth.logout)
authRouter.post('/validate', controllers.auth.validateToken)

export default authRouter