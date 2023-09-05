import express from "express";
import userControl from "../control/userControl.js";

const apiRouter = express.Router()
apiRouter.get('/focususers', userControl.focusUser)

export default apiRouter

//