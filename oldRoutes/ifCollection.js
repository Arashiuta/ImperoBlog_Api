import express from 'express'
import articleControl from '../control/articleControl.js'
const apiRouter = express.Router()

apiRouter.get('/ifcollection', articleControl.ifCollection) //

export default apiRouter