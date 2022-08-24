import express from 'express'
import { readFileSync } from 'fs'
import path from 'path'

const apiRouter = express.Router()

apiRouter.get('/getarchive', (req, res) => {
    const list = JSON.parse(readFileSync(path.join(__dirname, './data/archive.json'), 'utf-8'))

    res.send({
        status: 0,
        list: list
    })

})

export default apiRouter