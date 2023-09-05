import express from 'express'
import articleControl from "../control/articleControl.js";

const apiRouter = express.Router()


apiRouter.get('/gettoparticle', articleControl.getTopArticle)

export default apiRouter
//