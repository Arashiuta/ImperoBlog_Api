import express from 'express'
import https from 'https'
import http from 'http'
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express()
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, './ssl/8291855_www.ibukisk.top.key'), 'utf-8'),
    cert: fs.readFileSync(path.join(__dirname, './ssl/8291855_www.ibukisk.top.pem'), 'utf-8')
}
const httpSever = http.createServer(app)
const httpsSever = https.createServer(sslOptions, app)

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
//注册账号
import userRigister from './router/userRegister'
//更新昵称
import userUpdataNickname from "./router/userUpdataNickname";
//登录接口
import userLogin from "./router/userLogin";
//用户信息
import userAccountInfo from "./router/userAccountInfo";
//上传封面step1
import userUploadHeadImg from './router/userUploadHeadImg'
//上传封面step2
import userUploadHeadJson from './router/userUploadHeadJson'
//请求默认头像
import getDefaultHead from "./router/getDefaultHead";
//上传留言
import uploadMessage from "./router/uploadMessage";
//请求留言列表
import getMessageList from './router/getMessageList'
//删除留言
import delMessage from './router/delMessage'
//请求对应id的留言
import getIdMessage from './router/getIdMessage'
//文章点赞
import pariseArticle from './router/pariseArticle'
//查询是否已经点过赞
import ifParise from "./router/ifParise";
//文章收藏
import collectionArticle from './router/collectionArticle'
//查询文章是否已经收藏
import ifCollection from './router/ifCollection'
//查询发布的文章列表
import pushArticleNum from './router/pushArticleNum'

app.use(cors())
app.use(express.urlencoded({ extended: true }))
//托管静态资源
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
app.use('/api', userLogin)
app.use('/api', userAccountInfo)
app.use('/api', userUploadHeadImg)
app.use('/api', userUploadHeadJson)
app.use('/api', getDefaultHead)
app.use('/api', uploadMessage)
app.use('/api', getMessageList)
app.use('/api', delMessage)
app.use('/api', getIdMessage)
app.use('/api', pariseArticle)
app.use('/api', ifParise)
app.use('/api', collectionArticle)
app.use('/api', ifCollection)
app.use('/api', pushArticleNum)


httpSever.listen(3030, () => {
    console.log('http success');

})

httpsSever.listen(3031, () => {
    console.log('https success');
})
