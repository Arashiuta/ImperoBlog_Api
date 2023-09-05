import express from "express";
import articleControl from "../control/articleControl.js";

const apiRouter = express.Router()

apiRouter.get('/parisearticle', articleControl.praise) //

export default apiRouter