import express from "express";
import articleControl from "../control/articleControl.js";

const apiRouter = express.Router()

apiRouter.post('/uploadarticle', articleControl.upload)

export default apiRouter