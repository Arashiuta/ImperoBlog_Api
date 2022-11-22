import express from 'express'
import articleControl from "../control/articleControl";

const apiRouter = express.Router()


apiRouter.get('/articleaddcomment', articleControl.addComment)

export default apiRouter