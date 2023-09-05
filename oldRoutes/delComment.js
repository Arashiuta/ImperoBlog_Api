import express from 'express'
import articleControl from "../control/articleControl.js";

const apiRouter = express.Router()

apiRouter.get('/articledelcomment', articleControl.delComment)

export default apiRouter

//