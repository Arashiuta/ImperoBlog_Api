import { Server } from 'socket.io';

export function socketFunc(httpServer) {
    /*
        '事件广播'
        loginUsers - 返回当前在线的人的信息
        
    */
    
    //变量
    const userMap = new Map;  //在线角色列表

    //创建socket服务器连接
    const io = new Server(httpServer, {
        cors: {
            origin:"http://localhost:5173",
        }
    })

    io.on("new_namespace", (namespace) => {
       console.log("成功创建新的命名空间" + namespace);
    });

    //向所有用户广播当前在线信息
    const allOnlineEmit = (userMap) => {  
        //打印一下map列表
        const userArr = new Array;  //返回的登陆者的信息
        for (const [key,value] of userMap.entries()) {
            const tempObj = {
                account: key,
                root:value
            }
            userArr.push(tempObj)
        }
        io.emit('loginUsers',userArr) //返回当前在线的人的信息给所有用户
    }
    
    io.on("connection", async (socket) => {
        //新用户连接
        const loginInfo = JSON.parse(socket.handshake.auth.userInfo)
        userMap.set(loginInfo.account, loginInfo.root)  //把登入信息存到map里
        allOnlineEmit(userMap)

        socket.on('disconnect', () => {
            //退出人的信息
            const logoutInfo = JSON.parse(socket.handshake.auth.userInfo)
            //map删除这个人
            userMap.delete(logoutInfo.account)
            allOnlineEmit(userMap)
        })
    })
}