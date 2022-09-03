import Articles from "../model/articles";
import Tags from '../model/tags'
import moment from "moment";
import fs, { readFileSync, writeFileSync } from "fs";
import path from 'path'
import formidable from 'formidable';


class articlesControl {
    //获取文章列表===============================================================================================
    async getAllArticles(req: any, res: any) {
        const all = await Articles.find()
        res.send({
            status: 0,
            data: all
        })
    }

    //获取指定id的文章===============================================================================================
    async getIdArticle(req: any, res: any) {
        const idArticle = await Articles.find({ id: req.query.id })
        res.send({
            status: 0,
            data: idArticle[0]
        })
    }


    //修改文章===============================================================================================
    async editorArticle(req: any, res: any) {
        //获取要修改的文章id
        const editroId = req.body.id
        const editroInfo = req.body.data
        await Articles.updateOne({ id: editroId }, { $set: { oneSentence: editroInfo.oneSentence, content: editroInfo.mdContent } })

        res.send({
            status: 0
        })
    }

    //上传文章封面================================================================================================================
    async uploadArticleCover(req: any, res: any) {
        // 接收发送过来的封面图片
        const form = formidable({
            uploadDir: path.join(__dirname, '../image/articleImage/coverImage'),
            keepExtensions: true
        })

        form.parse(req, (err, fields, files) => {
            const filesInfoJson = JSON.stringify(files)
            const filesInfo = JSON.parse(filesInfoJson)
            // 图片的地址
            const filePath = {
                path: '/articleImage/coverImage/' + filesInfo.file.newFilename,
                name: filesInfo.file.newFilename
            }
            writeFileSync(path.join(__dirname, '../data/tempArticleCoverDir.json'), JSON.stringify(filePath))

        })
        res.send({
            status: 0
        })

    }

    //上传md文档的图片===============================================================================================
    async uploadMdImg(req: any, res: any) {
        //拿到即将上传的文章的id    //给每一个文章单独一个文件夹方便删除
        const reverseList = await Articles.find()
        const nextIdNum = reverseList[0].id + 1  //拿到即将上传的文章的id
        const nextId = nextIdNum.toString()
        //检查即将上传的文章的id对应的目录或文件是否存在
        if (!fs.existsSync(path.join(__dirname, '../image/articleImage/mdImg/', nextId))) {
            //如果不存在目录，则创建
            fs.mkdirSync(path.join(__dirname, '../image/articleImage/mdImg/', nextId))
        }

        // 接收发送过来的封面图片
        const form = formidable({
            uploadDir: path.join(__dirname, '../image/articleImage/mdImg/', nextId),
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
            writeFileSync('../data/tempMdImg.json', JSON.stringify(filePath))
            res.send({
                status: 0,
                url: filePath.path
            })
        });
    }


    //上传文章================================================================================================================
    async upload(req: any, res: any) {
        const data = req.body.list  //拿到发过来的文章信息

        //拿到即将上传的文章的id 
        const reverseList = await Articles.find().sort({ id: -1 })
        const nextIdNum = reverseList[0].id + 1  //拿到即将上传的文章的id
        //生成一个写入时间
        moment.locale()
        const uploadTime = moment().format('YYYY-MM-DD hh:mm:ss')
        //拿到上传的封面目录
        const tempCoverPath = JSON.parse(readFileSync(path.join(__dirname, '../data/tempArticleCoverDir.json'), 'utf-8'))
        let coverPath = {
            path: '',
            name: '',
        }
        if (tempCoverPath !== null) {
            coverPath = tempCoverPath
        }

        //拿到md文档上传的图片的名字
        const mdImg = JSON.parse(readFileSync(path.join(__dirname, '../data/tempMdImg.json'), 'utf-8'))

        const newArticle = {  //新文章!
            id: nextIdNum,
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

        await Articles.create(newArticle)
        //更新标签集合


        data.articleTags.map(async (item: any) => {
            const ifHave = await Tags.find({ content: item })
            if (ifHave.length === 0) {
                // 获取tag最后的id
                const nextTag = await Tags.find().sort({ id: -1 })
                const nextTagId = nextTag[0].id + 1
                const newTag = {
                    id: nextTagId,
                    content: item
                }
                await Tags.create(newTag)
            }
        })

        //把临时文章目录清空
        writeFileSync(path.join(__dirname, '../data/tempArticleCoverDir.json'), 'null')

        res.send({
            status: 0
        })
    }


    //删除文章
    async delArticle(req: any, res: any) {
        //获取要删除的文章的id
        const delId = req.query.id
        //获取要删除的文章
        const delArticle = await Articles.find({ id: delId })

        const delCoverName = delArticle[0].coverName  //要删除的封面的名字
        //封面目录文件名的数组
        const coverNameList = fs.readdirSync(path.join(__dirname, '../image/articleImage/coverImage'))
        //如果存在相应的封面就删除
        if (coverNameList.indexOf(delCoverName) !== -1) {
            fs.unlinkSync(path.join(__dirname, '../image/articleImage/coverImage/', delCoverName))
        }
        //删除对应id文件夹里面的md图片
        if (fs.existsSync(path.join(__dirname, '../image/articleImage/mdImg/', delId))) {
            while (fs.readdirSync(path.join(__dirname, '../image/articleImage/mdImg/', delId))) {
                const delName = fs.readdirSync(path.join(__dirname, '../image/articleImage/mdImg/', delId))[0]
                if (delName) {
                    fs.unlinkSync(path.join(__dirname, '../image/articleImage/mdImg/', delId, delName))
                } else {
                    break
                }
            }
            //删完里面的图片删除相应的文件夹
            fs.rmdirSync(path.join(__dirname, '../image/articleImage/mdImg/', delId))
        }

        //删除数据库里面的文章信息
        await Articles.deleteOne({ id: delId })

        res.send({
            status: 0
        })

    }
}

export default new articlesControl