import express from "express";
import ArticleControl from "../control/articleControl.js";

const apiRouter = express.Router()

//获取文章列表
apiRouter.get('/getarticle', ArticleControl.getAllArticles)

export default apiRouter