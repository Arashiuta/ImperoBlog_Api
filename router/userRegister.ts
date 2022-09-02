import express from "express";
import userControl from "../control/userControl";
const apiRouter = express.Router()

//注册接口
apiRouter.post('/register', userControl.register)

export default apiRouter