import express from 'express'
const apiRouter = express.Router()


apiRouter.get('/getdefaulthead', (req, res) => {
    const defaultHeadDir = '/headimage/defaultHead/defaulthead.PNG'
    res.send({
        status: 0,
        data: defaultHeadDir
    })
})

export default apiRouter
//