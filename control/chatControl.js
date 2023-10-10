import ChatRooms from "../model/chatRooms.js";
import moment from "moment";

class chatLog {
    //添加新的房间
    async newRoom(req, res) {
        const roomName = req.body.name
        const allRoom = await ChatRooms.find()
        const room = await ChatRooms.find({ name: roomName })  //搜寻对应房间名
        if (room.length === 0 && allRoom.length < 8) {  //如果房间名不存在并且房间数量小于8个
            const newRoom = {
                name: roomName,
                chatLog: new Array,
                delRoot:true
            }
            await ChatRooms.create(newRoom)  //添加新房间
            res.send({
                status: 0,
            })
        } else {
            res.send({
                status:1  //房间名已经存在
            })
        }
    }

    //请求所有的房间名
    async getAllRooms(req, res) {
        const rooms = await ChatRooms.find()
        const roomsName = new Array;
        rooms.map(i => {
            if (roomsName.length === 0) {
                const tempObj = {
                    id: 0,
                    name:i.name
                }
                roomsName.push(tempObj)
            } else {
                const newId = roomsName[roomsName.length - 1].id + 1
                const tempObj = {
                    id: newId,
                    name:i.name
                }
                roomsName.push(tempObj)
            }
        })
        res.send({
            status: 0,
            data:roomsName
        })
    }

    //删除房间
    async delRoom(req, res) {
        const delRoonName = req.body.name
        const haveName = await ChatRooms.find({name:delRoonName})
        if (haveName.length !== 0) {
            if (haveName[0].delRoot === true) {
                await ChatRooms.deleteOne({ name: delRoonName })
                res.send({
                    status:0
                })
            } else {
                //无法删除（此房间不允许被删除）
                res.send({
                    status:2
                })
            }
        } else {
            //删除失败
            res.send({
                status:1
            })
        }
    }

    //新的聊天内容
    async newChatInfo(req, res) {
        //req.body要包含:id,room(哪个房间),account(谁发的),content(内容)
        moment.locale()
        const sendMoment = moment().format('YYYY-MM-DD HH:mm:ss')
        const newLog = {
            id:req.body.id,
            account: req.body.account,
            content: req.body.content,
            time:sendMoment
        }
        const haveRoom = await ChatRooms.find({ name: req.body.room })
        if (haveRoom.length === 0) {
            // 房间不存在
            res.send({
                status: 1
            })
        } else {
            await ChatRooms.updateOne({ name: req.body.room }, { $push: { chatLog: newLog } })
            res.send({
                status: 0
            })
        }
    }

    //请求对应房间的聊天内容
    async getChatLog(req, res) {
        const log = await ChatRooms.find({ name: req.query.name })
        if (log.length === 0) {
            res.send({  //没有找到对应房间
                status: 1
            })
        } else {
            const chatLog = log[0].chatLog
            res.send({
                status: 0,
                data:chatLog
            })
        }
    }

}

export default new chatLog