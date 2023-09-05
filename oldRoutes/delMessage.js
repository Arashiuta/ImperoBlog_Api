import express from "express";
import messageControl from "../control/messageControl.js";

const apiRouter = express.Router()
apiRouter.get('/delmessage', messageControl.delMessage)

export default apiRouter

//