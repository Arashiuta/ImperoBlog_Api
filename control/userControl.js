import Users from "../model/users.js";
import formidable from 'formidable';
import fs, { readdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import path from 'path'
import moment from "moment";


class userControl {
    //注册============================================================================================================
    async register(req, res) {
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
            moment.locale()
            const createDate = moment().format('YYYY-MM-DD')  //生成一个申请账号的日期
            const newUser = {
                id: nextId,
                account: registerInfo.username,
                password: registerInfo.password,
                nickName: registerInfo.username,
                headImg: '/headimage/defaultHead/defaulthead.PNG',
                personalCover: '/personalImg/default/P)3T9@S7VH]V`QRNX[G`YRD.webp',
                createDate: createDate,
                root: false,
                sex: "保密"
            }

            await Users.create(newUser)


            res.send({
                status: 0
            })
        }
    }

    //更新昵称============================================================================================================
    async updataNickname(req, res) {
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
    async login(req, res) {
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
            } else {
                res.send({
                    status: 1  //密码错误
                })
            }
        } else {
            res.send({
                status: 2   //用户名不存在
            })
        }
    }

    //请求用户的信息============================================================================================================
    async accountInfo(req, res) {
        const account = req.query.account
        const info = await Users.find({ account: account })


        // const list = await Users.find()
        // list.map(async (item: any) => {
        //     await Users.updateOne({ id: item.id }, { $rename: { whoFocusMe: "fans" } })
        // })

        res.send({
            status: 0,
            data: info
        })
    }


    //更换头像1=============================================================================================================
    //因为我不会使用element的upload组件传参，所以使用了两个接口，一个存图片，一个改信息
    async uploadHeadImg(req, res) {
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
    async uploadHeadjson(req, res) {
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

    //修改密码=====================================================================================================================
    async changePassword(req, res) {
        const account = req.query.account
        const newPassword = req.query.newPassword
        await Users.updateOne({ account: account }, { $set: { password: newPassword } })
        res.send({
            status: 0
        })
    }

    //修改个人资料=====================================================================================================================
    async changePersonalIntroduce(req, res) {
        // console.log(req.query);
        const account = req.query.account
        const introduce = JSON.parse(req.query.data)
        await Users.updateOne({ account: account }, { $set: { nickName: introduce.nickName, sex: introduce.sex, eMail: introduce.eMail, personalWeb: introduce.personalWeb, introduce: introduce.introduce } })

        res.send({
            status: 0
        })
    }


    //点击关注=====================================================================================================================
    async focusUser(req, res) {
        const info = req.query
        if (info.ifFocus === 'false') {
            //还没关注，添加关注
            await Users.updateOne({ account: info.account }, { $addToSet: { focus: info.focus } })
            //给被关注的人粉丝 + 1
            await Users.updateOne({ account: info.focus }, { $addToSet: { fans: info.account } })
            res.send({
                status: 0
            })

        } else {
            //已经关注了，取消关注
            await Users.updateOne({ account: info.account }, { $pull: { focus: info.focus } })
            //给被关注的人粉丝 - 1
            await Users.updateOne({ account: info.focus }, { $pull: { fans: info.account } })
            res.send({
                status: 1
            })
        }
    }
}

export default new userControl()