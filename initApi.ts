import express from 'express'
const app = express()
import cors from "cors";

//请求文章列表
import getArticles from './getArticles'
//单独请求tag列表
import getTags from "./getTags";
//更新文章
import uploadArticle from './uploadArticle'
//上传封面
import uploadArticleCover from "./uploadArticleCover";
//删除文章
import delArticle from './delArticle'
//获取时间线的列表
import getArchive from './getArchive'
//修改文章
import articleEditor from './articleEditor'

app.use(cors())
app.use(express.urlencoded({ extended: true }))
//托管静态资源 不然无法请求出东西
app.use(express.static('./image'))
app.use('/api', getArticles)
app.use('/api', getTags)
app.use('/api', uploadArticle)
app.use('/api', uploadArticleCover)
app.use('/api', delArticle)
app.use('/api', getArchive)
app.use('/api', articleEditor)


app.listen(3030, () => {
    console.log('success');
})