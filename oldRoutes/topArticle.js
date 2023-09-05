import express from 'express'
import articleControl from "../control/articleControl.js";

const apiRouter = express.Router()


apiRouter.get('/toparticle', articleControl.topArticle) //

export default apiRouter