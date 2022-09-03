import express from 'express'
import articleControl from "../control/articleControl";

const apiRouter = express.Router()


apiRouter.post('/articleeditor', articleControl.editorArticle)

export default apiRouter