import express from 'express'
import fs, { readFileSync } from 'fs';
import path from 'path'

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


apiRouter.get('/delarticle', (req, res) => {
    const delId = Number(req.query.id)
    const strDelId = delId.toString()

    const articleList = JSON.parse(readFileSync(path.join(__dirname, './data/articleList.json'), 'utf-8'))
    const articles = articleList.articles  //文章列表
    const tags = articleList.allTags

    //筛选出要删除的文章
    const delArticle = articles.filter((item: Article) => {
        return item.id === delId
    })

    const delCoverName = delArticle[0].coverName  //要删除的封面的名字
    //封面目录文件名的数组
    const coverNameList = fs.readdirSync(path.join(__dirname, './image/articleImage/coverImage'))
    //如果存在相应的封面就删除
    if (coverNameList.indexOf(delCoverName) !== -1) {
        fs.unlinkSync(path.join(__dirname, './image/articleImage/coverImage/', delCoverName))
    }
    //删除对应id文件夹里面的md图片
    if (fs.existsSync(path.join(__dirname, './image/articleImage/mdImg/', strDelId))) {
        while (fs.readdirSync(path.join(__dirname, './image/articleImage/mdImg/', strDelId))) {
            const delName = fs.readdirSync(path.join(__dirname, './image/articleImage/mdImg/', strDelId))[0]
            if (delName) {
                fs.unlinkSync(path.join(__dirname, './image/articleImage/mdImg/', strDelId, delName))
            } else {
                break
            }
        }
        //删完里面的图片删除相应的文件夹
        fs.rmdirSync(path.join(__dirname, './image/articleImage/mdImg/', strDelId))
    }

    //筛选出删除文章之后的文章列表
    const newArticleList = articles.filter((item: Article) => {
        return item.id !== delId
    })

    const newArticle = {
        articles: newArticleList,
        allTags: tags
    }

    fs.writeFileSync('./data/articleList.json', JSON.stringify(newArticle))

    res.send({
        status: 0
    })
})

export default apiRouter