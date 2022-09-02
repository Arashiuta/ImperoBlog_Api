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
}

export default new userControl()