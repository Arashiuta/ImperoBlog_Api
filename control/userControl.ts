import Users from "../model/users";
import formidable from 'formidable';
import fs, { readdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import path from 'path'


class userControl {
    //注册============================================================================================================
    async register(req: any, res: any) {
        const registerInfo = req.body
        //先判断用户名是否已经被注册
        const ifHave = await Users.find({ account: registerInfo.username })
        if (ifHave.length !== 0) {
            res.send({
                status: 1
            })
            return
        } else {
            const lastUser = await Users.find().sort({ id: -1 })
            const nextId = lastUser[0].id + 1
            const newUser = {
                id: nextId,
                account: registerInfo.username,
                password: registerInfo.password,
                nickName: registerInfo.username,
                headImg: '/headimage/defaultHead/defaulthead.PNG',
                root: false
            }

            await Users.create(newUser)

            res.send({
                status: 0
            })
        }
    }

    //更新昵称============================================================================================================
    async updataNickname(req: any, res: any) {
        const newNick = req.query.nickName
        const accountQuery = req.query.account
        const findAccount = await Users.find({ account: accountQuery })
        if (findAccount.length !== 0) {
            await Users.updateOne({ account: accountQuery }, { $set: { nickName: newNick } })
            res.send({
                status: 0
            })
        } else {
            res.send({
                status: 1
            })
        }
    }

    //登录============================================================================================================
    async login(req: any, res: any) {
        const loginInfo = req.body
        const ifHaveAccount = await Users.find({ account: loginInfo.username })
        const userInfo = ifHaveAccount[0]
        if (ifHaveAccount.length !== 0) {
            //用户存在
            if (userInfo.password === loginInfo.password) {
                res.send({
                    status: 0,  //登录成功
                    data: userInfo  //把用户信息返回去
                })
            }
        } else {
            res.send({
                status: 2   //用户名不存在
            })
        }
    }

    //请求用户的信息============================================================================================================
    async accountInfo(req: any, res: any) {
        const account = req.query.account
        const info = await Users.find({ account: account })
        res.send({
            status: 0,
            data: info
        })
    }


    //更换头像1=============================================================================================================
    //因为我不会使用element的upload组件传参，所以使用了两个接口，一个存图片，一个改信息
    async uploadHeadImg(req: any, res: any) {
        // 接收发送过来的头像图片
        const form = formidable({
            uploadDir: path.join(__dirname, '../image/headimage/'),
            keepExtensions: true
        })
        form.parse(req, (err, fields, files) => {
            const filesInfoJson = JSON.stringify(files)
            const filesInfo = JSON.parse(filesInfoJson)
            //图片的地址
            const filePath = {
                path: '/headimage/' + filesInfo.file.newFilename,
                name: filesInfo.file.newFilename
            }
            //记录图片的地址
            writeFileSync(path.join(__dirname, '../data/tempHeadImg.json'), JSON.stringify(filePath))
        });

        res.send({
            status: 0,
        })
    }

    //更换头像2=============================================================================================================
    async uploadHeadjson(req: any, res: any) {
        const account = req.query.account
        //读出图片的地址并给相应的用户更改头像
        //改前要先把原头像删除
        const userHeadInfo = await Users.find({ account: account })  //获取用户信息
        const headDir = readdirSync(path.join(__dirname, '../image/headimage'))

        //如果存在原头像，就删除
        if (headDir.indexOf(userHeadInfo[0].headImgName) !== -1) {
            unlinkSync(path.join(__dirname, '../image/headimage/' + userHeadInfo[0].headImgName))
        }
        //更换新地址
        const headJson = JSON.parse(readFileSync(path.join(__dirname, '../data/tempHeadImg.json'), 'utf-8'))
        await Users.updateOne({ account: account }, { $set: { headImg: headJson.path, headImgName: headJson.name } })
        writeFileSync(path.join(__dirname, '../data/tempHeadImg.json'), JSON.stringify(null))
        res.send({
            status: 0
        })
    }
}

export default new userControl()