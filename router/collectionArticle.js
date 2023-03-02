import express from 'express'
import articleControl from '../control/articleControl.js'
const apiRouter = express.Router()

apiRouter.get('/collectionarticle', articleControl.collection)

export default apiRouter