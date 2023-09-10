import express from 'express'
import articleControl from "../control/articleControl.js";
import userControl from '../control/userControl.js';
import messageControl from "../control/messageControl.js";
import searchControl from '../control/searchControl.js';
import tagsControl from "../control/tagsControl.js";
import { readdirSync } from 'fs'
const apiRouter = express.Router()

apiRouter.get('/articleaddcomment', articleControl.addComment)  //发布文章评论
apiRouter.post('/articleeditor', articleControl.editorArticle)  //修改文章
apiRouter.get('/changepassword', userControl.changePassword)  //修改密码
apiRouter.get('/changepersonalintroduce', userControl.changePersonalIntroduce)  //修改个人资料
apiRouter.get('/collectionarticle', articleControl.collection) //文章收藏
apiRouter.get('/delarticle', articleControl.delArticle)   //删除文章
apiRouter.get('/articledelcomment', articleControl.delComment)  //删除文章的评论
apiRouter.get('/delmessage', messageControl.delMessage)  //删除留言
apiRouter.get('/focususers', userControl.focusUser)  //点击关注
apiRouter.get('/getarticle', articleControl.getAllArticles)   //获取文章列表
apiRouter.get('/getidarticle', articleControl.getIdArticle)  //获取指定id的文章
apiRouter.get('/getidmessage', messageControl.getIdMessage)  //请求对应id的留言的信息
apiRouter.get('/getmessages', messageControl.getMessageList) //请求留言列表
apiRouter.get('/gettags', tagsControl.getAllTags)  //获取所有的标签
apiRouter.get('/gettoparticle', articleControl.getTopArticle)  //请求置顶文章
apiRouter.get('/ifcollection', articleControl.ifCollection)   //查询是否已经收藏了
apiRouter.get('/ifparise', articleControl.ifPraise) //查询是否已经点赞了
apiRouter.get('/parisearticle', articleControl.praise)  //给文章点赞
apiRouter.get('/pusharticlenum', articleControl.pushArticleNum) //查询发布了哪些文章
apiRouter.get('/replycomment', articleControl.replyComment)  //回复评论
apiRouter.get('/toparticle', articleControl.topArticle) //置顶文章
apiRouter.post('/uploadarticle', articleControl.upload)  //上传文章
apiRouter.post('/uploadarticlecover', articleControl.uploadArticleCover); //上传封面调用这个
apiRouter.post('/uploadmdimg', articleControl.uploadMdImg)  //MD文档上传图片调用这个
apiRouter.get('/uploadmessage', messageControl.uploadMessage) //上传留言
apiRouter.get('/userinfo', userControl.accountInfo) //请求用户的信息
apiRouter.post('/login', userControl.login)  //登录
apiRouter.post('/register', userControl.register)  //注册
apiRouter.get('/updatanicknane', userControl.updataNickname) //更新昵称
apiRouter.post('/uploadhead', userControl.uploadHeadImg) //更换头像1
apiRouter.get('/uploadheadjson', userControl.uploadHeadjson)  //更换头像2
apiRouter.get('/searcharticle', searchControl.searchArticle)  //搜索文章
apiRouter.get('/searchuser', searchControl.searchUser)  //搜索用户
apiRouter.get('/getcover', (req, res) => {
    const coverList = readdirSync('./image/indexCover')
    //生成一个随机数,随机选一个做封面
    const num = Math.floor(Math.random() * coverList.length)
    const coverName = coverList[num]
    const coverUrl = '/indexCover/' + coverName
    res.send({
        status: 0,
        coverUrl: coverUrl
    })
})
apiRouter.get('/getdefaulthead', (req, res) => {   //获取默认头像
    const defaultHeadDir = '/headimage/defaultHead/defaulthead.PNG'
    res.send({
        status: 0,
        data: defaultHeadDir
    })
})


export default apiRouter