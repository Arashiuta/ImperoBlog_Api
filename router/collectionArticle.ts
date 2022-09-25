import express from 'express'
import articleControl from '../control/articleControl'
const apiRouter = express.Router()

apiRouter.get('/collectionarticle', articleControl.collection)

export default apiRouter