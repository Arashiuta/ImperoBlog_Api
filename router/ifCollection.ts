import express from 'express'
import articleControl from '../control/articleControl'
const apiRouter = express.Router()

apiRouter.get('/ifcollection', articleControl.ifCollection)

export default apiRouter