import express from "express";
import articleControl from "../control/articleControl";

const apiRouter = express.Router()
apiRouter.get('/ifparise', articleControl.ifPraise)

export default apiRouter