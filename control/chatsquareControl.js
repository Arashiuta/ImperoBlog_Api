import chatSquare from "../model/chatsquare.js";

class chatsquareTip {
    //获取公告内容
    async getChatSquareTip(req, res) {
        const tip = await chatSquare.find()
        res.send({
            status: 0,
            data:tip
        })
    }

    //修改公告
    async setChatSquareTip(req, res) {
        const id = req.body.id
        const tip = req.body.tip
        await chatSquare.updateOne({ _id: id }, { $set: { tip: tip } })
        res.send({
            status: 0
        })
    }
}

export default new chatsquareTip()