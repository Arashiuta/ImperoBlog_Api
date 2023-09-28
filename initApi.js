import express from 'express'
import https from 'https'
import http from 'http'
import cors from "cors";
import fs from "fs";
import path from "path";
import { socketFunc } from './socket/chatServer.js';
const __dirname = path.resolve()
const app = express()
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname,'/ssl/impero.top.key'), 'utf-8'),
    cert: fs.readFileSync(path.join(__dirname,'/ssl//impero.top_bundle.pem'), 'utf-8')
}
const httpServer = http.createServer(app)
const httpsServer = https.createServer(sslOptions, app)

socketFunc(httpServer) //socket函数

//api列表
import apiRoutes from './router/apiRoutes.js'

/*
//请求文章列表
import getArticles from './router/getArticles.js'
//请求指定id的文章
import getIdArticle from "./router/getIdArticle.js";
//获取所有的tag标签
import getTags from "./router/getTags.js";
//更新文章
import uploadArticle from './router/uploadArticle.js'
//上传封面
import uploadArticleCover from "./router/uploadArticleCover.js";
//删除文章
import delArticle from './router/delArticle.js'
//修改文章
import articleEditor from './router/articleEditor.js'
//请求封面
import getCover from './router/getCover.js'
//注册账号
import userRigister from './router/userRegister.js'
//更新昵称
import userUpdataNickname from "./router/userUpdataNickname.js";
//登录接口
import userLogin from "./router/userLogin.js";
//用户信息
import userAccountInfo from "./router/userAccountInfo.js";
//上传封面step1
import userUploadHeadImg from './router/userUploadHeadImg.js'
//上传封面step2
import userUploadHeadJson from './router/userUploadHeadJson.js'
//请求默认头像
import getDefaultHead from "./router/getDefaultHead.js";
//上传留言
import uploadMessage from "./router/uploadMessage.js";
//请求留言列表
import getMessageList from './router/getMessageList.js'
//删除留言
import delMessage from './router/delMessage.js'
//请求对应id的留言
import getIdMessage from './router/getIdMessage.js'
//文章点赞
import pariseArticle from './router/pariseArticle.js'
//查询是否已经点过赞
import ifParise from "./router/ifParise.js";
//文章收藏
import collectionArticle from './router/collectionArticle.js'
//查询文章是否已经收藏
import ifCollection from './router/ifCollection.js'
//查询发布的文章列表
import pushArticleNum from './router/pushArticleNum.js'
//修改密码
import changePassword from './router/changePassword.js'
//修改个人资料
import changePersonalIntroduce from "./router/changePersonalIntroduce.js";
//关注用户
import focusUser from "./router/focusUser.js";
//发布文章评论
import addComment from "./router/addComment.js";
//删除文章评论
import delComment from "./router/delComment.js";
//回复评论
import replyComment from "./router/replyComment.js";
//置顶文章
import topArticle from "./router/topArticle.js"
//请求置顶文章id
import getTopArticle from "./router/getTopArticle.js";
*/

app.use(cors()) //跨域
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./image'))  //托管静态资源
app.use('/api',apiRoutes)

/*
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
app.use('/api', changePassword)
app.use('/api', changePersonalIntroduce)
app.use('/api', focusUser)
app.use('/api', addComment)
app.use('/api', delComment)
app.use('/api', replyComment)
app.use('/api', topArticle)
app.use('/api', getTopArticle)
*/


httpServer.listen(3030, () => {
    console.log('http success')

})

httpsServer.listen(3031, () => {
    console.log('https success')
})