import express from 'express'
import articleControl from "../control/articleControl.js";

const apiRouter = express.Router()


apiRouter.post('/articleeditor', articleControl.editorArticle)

export default apiRouter