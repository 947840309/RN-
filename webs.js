const webSocket = require('ws')
const ws = webSocket.Server

let userList = []

const wss = new ws({
    port: 3000
}, () => {
    console.log('服务器启动成功！！')
})


wss.on('connection', function (us) {

    console.log('新用户加入')

    us.on('message', function (message) {
        let datas = JSON.parse(message),
            { how, type, data } = datas
        console.log(datas)
        if (how == 'server') {  //消息发送给服务器
            if (type == 'userID') {  //消息类型为保存用户ID
                let flag = true
                userList.some((ele) => {
                    if (ele.userID == data) {
                        flag = false
                        return true
                    }
                })
                if (flag) {
                    userList.push({
                        userID: data,
                        userLE: us
                    })
                    console.log('成功保存用户信息')
                    us.send(JSON.stringify({
                        how: 'server',
                        data: 'ok',
                        type: 'OK'
                    }))
                    setTimeout(() => {
                        let v = JSON.stringify({
                            how: 'server',
                            data: userList,
                            type: 'newList'
                        })
                        let u = JSON.stringify({
                            how: 'server',
                            data: data,
                            type: 'newUser'
                        })
                        userList.forEach((ele) => {
                            ele.userLE.send(v)
                            ele.userLE.send(u)
                        })
                    }, 0)
                } else {
                    let err = {
                        how: 'server',
                        data: 'namereuse',
                        type: 'namereuse'
                    }
                    us.send(JSON.stringify(err))
                }
            }

            if (type == 'closer') {  //用户断开连接
                console.log('删除用户信息')
                userList.some((ele, index) => {
                    if (ele.userID == data) {
                        var o = userList.splice(index, 1)
                        console.log(o)
                        return true
                    }
                })
                let v = JSON.stringify({
                    how: 'server',
                    data: userList,
                    type: 'newList'
                })
                let u = JSON.stringify({
                    how: 'server',
                    data: data,
                    type: 'removeUser'
                })
                userList.forEach((ele) => {
                    ele.userLE.send(v)
                    ele.userLE.send(u)
                })
            }
        }

        if (how == 'users') {  //公共聊天
            userList.forEach(ele => {
                let datas = {
                    how: 'users',
                    data: data,
                    type: null
                }
                ele.userLE.send(JSON.stringify(datas))
            })
        }

        if (how == 'user') {   //单独建立聊天通道
            let user = {}
            userList.some((ele) => {
                if(ele.userID == type){
                    user = ele
                    return true
                }
            })
            let datas = {
                how: 'user',
                data: data,
                type: data[0].user.name
            }
            user.userLE.send(JSON.stringify(datas))
        }
    })
});

