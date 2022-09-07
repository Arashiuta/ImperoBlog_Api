import express from "express";
import messageControl from "../control/messageControl";

const apiRouter = express.Router()

apiRouter.get('/getmessages', messageControl.getMessageList)

export default apiRouter