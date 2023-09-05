import express from "express";
import articleControl from "../control/articleControl.js";

const apiRouter = express.Router()
apiRouter.get('/ifparise', articleControl.ifPraise)//

export default apiRouter