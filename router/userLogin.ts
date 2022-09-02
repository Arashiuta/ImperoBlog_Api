import express from "express";
import userControl from '../control/userControl'

const apiRouter = express.Router()
apiRouter.post('/login', userControl.login)

export default apiRouter