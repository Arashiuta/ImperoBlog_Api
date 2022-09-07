import express from 'express'
import userControl from "../control/userControl";
const apiRouter = express.Router()

apiRouter.get('/uploadheadjson', userControl.uploadHeadjson)

export default apiRouter