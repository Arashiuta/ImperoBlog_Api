import express from "express";
import messageControl from "../control/messageControl";

const apiRouter = express.Router()
apiRouter.get('/delmessage', messageControl.delMessage)

export default apiRouter