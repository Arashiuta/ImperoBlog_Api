import express from 'express'
import articleControl from "../control/articleControl";

const apiRouter = express.Router()


apiRouter.get('/articleeditor', articleControl.editorArticle)

export default apiRouter