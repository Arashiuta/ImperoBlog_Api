import express from "express";
import messageControl from '../control/messageControl.js'

const apiRouter = express.Router()
apiRouter.get('/uploadmessage', messageControl.uploadMessage)

export default apiRouter