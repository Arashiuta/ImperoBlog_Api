import express from 'express'
import { readdirSync } from 'fs'

const apiRouter = express.Router()

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

export default apiRouter

//