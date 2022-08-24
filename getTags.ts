import express from "express";
import fs from "fs";
import path from "path";

const apiRouter = express.Router()

apiRouter.get('/gettags', (req, res) => {
    const articleJson = fs.readFileSync(path.join(__dirname, './data/articleList.json'), 'utf-8')
    const article = JSON.parse(articleJson)
    const allTags = article.allTags
    res.send({
        tags: allTags
    })

})

export default apiRouter