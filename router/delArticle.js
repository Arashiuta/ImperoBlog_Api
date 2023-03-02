import express from 'express'
import articleControl from '../control/articleControl.js'

const apiRouter = express.Router()


apiRouter.get('/delarticle', articleControl.delArticle)

export default apiRouter