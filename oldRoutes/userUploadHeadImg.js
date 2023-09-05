import express from 'express'
import userControl from "../control/userControl.js";
const apiRouter = express.Router()

apiRouter.post('/uploadhead', userControl.uploadHeadImg) //

export default apiRouter