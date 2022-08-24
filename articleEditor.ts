import express from 'express'
import { readFileSync, writeFileSync } from 'fs';
import path from 'path'
import moment from "moment";

const apiRouter = express.Router()

type Article = {
    id: number
    title: string
    author?: string
    tag: Array<string>
    cover?: string
    coverName?: string
    mdImgName?: string
    time: string
    lastUpdataTime: string
    oneSentence: string
    content: string
}


apiRouter.get('/articleeditor', (req, res) => {
    // 获取文章列表
    const list = JSON.parse(readFileSync(path.join(__dirname, './data/articleList.json'), 'utf-8'))
    const articleList = list.articles

    //获取新的文章内容
    const newContent = JSON.parse(JSON.stringify(req.query.content))

    articleList.map((item: Article) => {
        if (item.id === Number(req.query.id)) {   //找到要修改的文章修改相应的内容
            item.content = newContent
            //生成更新时间
            moment.locale()
            const lastUpdataTime = moment().format('YYYY-MM-DD hh:mm:ss')
            item.lastUpdataTime = lastUpdataTime
        }
    })

    const newList = {
        articles: articleList,
        allTags: list.allTags
    }

    writeFileSync(path.join(__dirname, './data/articleList.json'), JSON.stringify(newList))



    res.send({
        status: 0
    })
})

export default apiRouter