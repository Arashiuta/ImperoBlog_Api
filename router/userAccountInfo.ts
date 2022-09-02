import express from "express";
import userControl from '../control/userControl'

const apiRouter = express.Router()
apiRouter.get('/userinfo', userControl.accountInfo)

export default apiRouter