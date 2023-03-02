import express from "express";
import articleControl from "../control/articleControl.js";

const apiRouter = express.Router()

apiRouter.get('/replycomment', articleControl.replyComment)

export default apiRouter