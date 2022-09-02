import express from 'express'
const app = express()
import cors from "cors";

//注册接口
//请求文章列表
import getArticles from './router/getArticles'
//请求指定id的文章
import getIdArticle from "./router/getIdArticle";
//获取所有的tag标签
import getTags from "./router/getTags";
//更新文章
import uploadArticle from './router/uploadArticle'
//上传封面
import uploadArticleCover from "./router/uploadArticleCover";
//删除文章
import delArticle from './router/delArticle'
//修改文章
import articleEditor from './router/articleEditor'
//请求封面
import getCover from './router/getCover'
//注册接口
import userRigister from './router/userRegister'
//更新昵称
import userUpdataNickname from "./router/userUpdataNickname";


app.use(cors())
app.use(express.urlencoded({ extended: true }))
//托管静态资源 不然无法请求出东西
app.use(express.static('./image'))
app.use('/api', getArticles)
app.use('/api', getTags)
app.use('/api', uploadArticle)
app.use('/api', uploadArticleCover)
app.use('/api', delArticle)
app.use('/api', articleEditor)
app.use('/api', getCover)
app.use('/api', getIdArticle)
app.use('/api', userRigister)
app.use('/api', userUpdataNickname)


app.listen(3030, () => {
    console.log('success');
})