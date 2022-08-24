import express from "express";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
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

type CoverPath = {
    path: string
    name: string
}

apiRouter.post('/uploadarticle', (req, res) => {
    const data = req.body.list  //拿到发过来的文章信息

    const articleJson = readFileSync(path.join(__dirname, './data/articleList.json'), 'utf-8')  //读取json文件
    const articleList = JSON.parse(articleJson) //转化为对象
    const reverseList = articleList.articles.reverse()  //数组反转，去索引0就可以取到最后的id
    //生成一个写入时间
    moment.locale()
    const uploadTime = moment().format('YYYY-MM-DD hh:mm:ss')
    //拿到上传的封面目录
    const tempCoverPath = JSON.parse(readFileSync(path.join(__dirname, './data/tempArticleCoverDir.json'), 'utf-8'))
    let coverPath: CoverPath = {
        path: '',
        name: '',
    }
    if (tempCoverPath !== null) {
        coverPath = tempCoverPath
    }

    //拿到md文档上传的图片的名字
    const mdImg = JSON.parse(readFileSync(path.join(__dirname, './data/tempMdImg.json'), 'utf-8'))

    const newArticle: Article = {
        id: reverseList[0].id + 1,
        title: data.articleTitle,
        author: data?.author,
        tag: data.articleTags,
        cover: coverPath.path,
        coverName: coverPath.name,
        mdImgName: mdImg.name,
        time: uploadTime,
        lastUpdataTime: uploadTime,
        oneSentence: data.articleOneSentence,
        content: data.articleText
    }
    const newArticleList = reverseList.reverse() //把反过来的数组转回来
    newArticleList.push(newArticle)  //在后面添加上新的文章   新的文章对象就完成了

    //更新标签的数组
    const jsonAllTags = articleList.allTags  //已经有的标签数组

    //使用every方法失败，只好使用for循环
    for (let i = 0; i < data.articleTags.length; i++) {
        if (jsonAllTags.indexOf(data.articleTags[i]) === -1) {
            jsonAllTags.push(data.articleTags[i])
        }

    }
    //新的文章对象
    const newJson = {
        articles: newArticleList,
        allTags: jsonAllTags
    }

    //把新生成的文章文件覆盖掉原来的，就完成了更新
    const uploadJson = JSON.stringify(newJson)
    writeFileSync(path.join(__dirname, './data/articleList.json'), uploadJson)
    writeFileSync(path.join(__dirname, './data/backup.json'), uploadJson)

    //把临时文章目录都清空
    writeFileSync(path.join(__dirname, './data/tempArticleCoverDir.json'), 'null')




    type UpdataAchive = {
        id: number
        time: string
        title: string
        color?: string
        content: string
    }

    //更新归档时间线的内容
    const achiveTime = moment().format('YYYY-MM-DD')
    const achiveJson = JSON.parse(readFileSync(path.join(__dirname, './data/archive.json'), 'utf-8'))
    const achiveNextId = achiveJson.reverse()[0].id + 1  //取id要反转数组，取完了要记得把数组转回来
    achiveJson.reverse()

    //随机一个颜色
    const colors = ['#FFDA45', '#E07F3A', '#F74D77', '#8D3AE0', '#6EA7FA', '#54BAB9', '#ECCCB2']
    const colorNum = Math.floor(Math.random() * 7)


    const updataAchive: UpdataAchive = {
        id: achiveNextId,
        time: achiveTime,
        title: '文章更新',
        color: colors[colorNum],
        content: newArticle.title
    }
    achiveJson.push(updataAchive)
    writeFileSync(path.join(__dirname, './data/archive.json'), JSON.stringify(achiveJson))



    res.send({
        status: 0
    })
})

export default apiRouter