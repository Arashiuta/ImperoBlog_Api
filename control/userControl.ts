import Users from "../model/users";

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
                headImg: '',
                ifroot: false
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
        console.log(req.query);
        res.send({
            status: 0,
        })

    }
}

export default new userControl()