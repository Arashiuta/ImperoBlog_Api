import express from "express";
import formidable from 'formidable';
import fs, { readFileSync, writeFileSync } from "fs";
import path from 'path'

const apiRouter = express.Router()

//上传封面调用这个
apiRouter.post('/uploadarticlecover', (req, res) => {
    // 接收发送过来的封面图片
    const form = formidable({
        uploadDir: './image/articleImage/coverImage',
        keepExtensions: true
    })


    form.parse(req, (err, fields, files) => {
        const filesInfoJson = JSON.stringify(files)
        const filesInfo = JSON.parse(filesInfoJson)
        //图片的地址
        const filePath = {
            path: '/articleImage/coverImage/' + filesInfo.file.newFilename,
            name: filesInfo.file.newFilename
        }
        writeFileSync('./data/tempArticleCoverDir.json', JSON.stringify(filePath))
    })

    res.send({
        status: 0,
    })
});


//MD文档上传图片调用这个
apiRouter.post('/uploadmdimg', (req, res) => {

    //拿到即将上传的文章的id    //给每一个文章单独一个文件夹方便删除
    const articleList = JSON.parse(readFileSync(path.join(__dirname, './data/articleList.json'), 'utf-8'))
    const nextIdNum = articleList.articles.reverse()[0].id + 1  //拿到即将上传的文章的id
    const nextId = nextIdNum.toString()
    //检查即将上传的文章的id对应的目录或文件是否存在
    if (!fs.existsSync(path.join(__dirname, './image/articleImage/mdImg/', nextId))) {
        //如果不存在目录，则创建
        fs.mkdirSync(path.join(__dirname, './image/articleImage/mdImg/', nextId))
    }

    // 接收发送过来的封面图片
    const form = formidable({
        // uploadDir: './image/articleImage/mdImg/' + nextId,
        uploadDir: path.join(__dirname, './image/articleImage/mdImg/', nextId),
        keepExtensions: true
    })


    form.parse(req, (err, fields, files) => {
        const filesInfoJson = JSON.stringify(files)
        const filesInfo = JSON.parse(filesInfoJson)
        //图片的地址
        const filePath = {
            path: '/articleImage/mdImg/' + nextId + '/' + filesInfo.file.newFilename,
            name: filesInfo.file.newFilename
        }
        writeFileSync('./data/tempMdImg.json', JSON.stringify(filePath))
        res.send({
            status: 0,
            url: filePath.path
        })
    });
})


export default apiRouter