import Messages from "../model/message";
import moment from 'moment'

class messageControl {
    //上传留言====================================================================================================================
    async uploadMessage(req: any, res: any) {
        const account = req.query.account
        const content = req.query.content
        const list = await Messages.find().sort({ id: -1 })
        const nextId = list[0].id + 1
        //生成一个写入时间
        moment.locale()
        const uploadTime = moment().format('YYYY-MM-DD hh:mm:ss')
        const newMessage = {
            id: nextId,
            account: account,
            time: uploadTime,
            content: content
        }
        await Messages.create(newMessage)

        res.send({
            status: 0
        })
    }

    //请求留言列表======================================================================================================
    async getMessageList(req: any, res: any) {
        const list = await Messages.find()

        res.send({
            status: 0,
            data: list
        })
    }

    //删除留言==================================================================================================
    async delMessage(req: any, res: any) {
        const delId = req.query.id
        await Messages.deleteOne({ id: delId })
        res.send({
            status: 0
        })
    }

    //请求对应id的留言的信息==============================================================================================
    async getIdMessage(req: any, res: any) {
        const delId = req.query.id
        const idMessage = await Messages.find({ id: delId })
        res.send({
            status: 0,
            data: idMessage
        })
    }
}

export default new messageControl()