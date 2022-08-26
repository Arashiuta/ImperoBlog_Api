import express from "express";
import fs from "fs";
import path from "path";

const apiRouter = express.Router()

type Article = {
    id: number
    title: string
    author?: string
    tag: Array<string>
    cover?: string
    coverName?: string
    mdImgName?: Array<string>
    time: string
    oneSentence: string
    content: string
}

apiRouter.get('/getarticle', (req, res) => {
    const articleJson = fs.readFileSync(path.join(__dirname, './data/articleList.json'), 'utf-8')
    const article = JSON.parse(articleJson)
    //如果发过来的请求带id，则返回相对于id的文章，如果没有则返回全部文章json列表
    if (req.query.id) {
        //请求发过来的id是string转成number
        const articleId = Number(req.query.id)
        const articleList = article.articles
        const getArticle = articleList.filter((item: Article) => {
            return item.id === articleId
        })
        res.send({
            getArticle
        })
    } else {
        res.send({
            article
        })
    }


})

export default apiRouter