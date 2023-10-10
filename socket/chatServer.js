import { Server } from 'socket.io';
import Users from "../model/users.js";
import moment from 'moment'

export function socketFunc(httpServer) {
    /*
        '事件广播'
        loginUsers - 返回当前在线的人的信息
        getUsers - 前端获取当前在线列表
        roomsChange - 房间发生变化
        uploadLocalLog - 有人发送消息，要推送给所有用户，并更新本地记录，数据库也会更新
    */
    
    //变量
    const userMap = new Map;

    //创建socket服务器连接
    const io = new Server(httpServer, {
        cors: {
            origin:["http://localhost:5173","https://www.impero.top","https://impero.top"],
        }
    })

    io.on("new_namespace", (namespace) => {
       console.log("成功创建新的命名空间" + namespace);
    });

    //向用户广播当前在线人
    const emitOnlineList = () => {
        const tempArr = new Array;
        for (const [key,value] of userMap.entries()) {
            tempArr.push(value)
        }
        io.emit('loginUsers',tempArr)
    }
    
    io.on("connection", async (socket) => {
        //新用户连接
        const loginInfo = JSON.parse(socket.handshake.auth.userInfo)
        const info = await Users.find({ account: loginInfo.account })
        userMap.set(loginInfo.account, info[0])
        emitOnlineList() //向用户广播当前在线人

        //前端获取当前在线列表
        socket.on('getUsers', (data, callback) => {
            const tempArr = new Array;
            for (const [key,value] of userMap.entries()) {
                tempArr.push(value)
            }
            callback(tempArr)
        })

        //房间发生变化
        socket.on('roomsChange', (data, callback) => {
            io.emit('roomsChange','roomsChange')
        })

        //有人发送消息
        socket.on('uploadLocalLog', (data, callback) => {
            //临时加入的消息没有时间time，临时加上一个事件，这个事件一般与加入服务器的事件同步
            moment.locale()
            const sendMoment = moment().format('YYYY-MM-DD HH:mm:ss')
            data[1].time = sendMoment
            io.emit('uploadLocalLog',data)
        })

        socket.on('disconnect', () => {
            //退出人的信息
            const logoutInfo = JSON.parse(socket.handshake.auth.userInfo)
            userMap.delete(logoutInfo.account)
            emitOnlineList()
        })
    })
}