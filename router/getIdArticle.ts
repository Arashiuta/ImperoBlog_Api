import express from "express";
import ArticleControl from "../control/articleControl";

const apiRouter = express.Router()

//获取指定id的文章
apiRouter.get('/getidarticle', ArticleControl.getIdArticle)

export default apiRouter