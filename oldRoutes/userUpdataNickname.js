import express from "express";
import userControl from "../control/userControl.js";
const apiRouter = express.Router()

apiRouter.get('/updatanicknane', userControl.updataNickname) //

export default apiRouter