import { v4 as uuidv4 } from 'uuid';

class WS {
    constructor(userID, url, self) {
        this.self = self,
            this.self2 = null,
            this.userID = userID
        this.ws = new WebSocket(url)
        this.ws.onclose = () => {
            console.log('连接已关闭')
        }
        this.ws.onerror = (e) => {
            console.log('通讯发生未知错误', e)
            this.self.setState({
                loginFlag: false
            })
            this.self.openAlert('系统消息', '抱歉，连接服务器发生未知错误，请重试...')
        }
        this.ws.onopen = () => {
            console.log('已连接上ws服务器')
            this.send('server', this.userID, 'userID')
            self.setState({
                ZT: '成功连接服务器...',
                loginFlag: false
            })
        }
        this.ws.onmessage = this.message
    }

    message = (ele) => {
        let { how, data, type } = JSON.parse(ele.data)
        if (how == 'users') { //发送给用户的消息
            this.self.state.messages.push(...data)
            this.self.setState({
                messages: this.self.state.messages
            })
        } else if (how == 'server') {  //服务器发出的消息
            if (type == 'namereuse') {
                this.self.openAlert('系统消息', '用户名重复！请重新输入用户名。')
            } else if (type == 'OK') {
                this.self.setState({
                    flag: true,
                    myID: {
                        avatar: this.self.state.myID.avatar,
                        _id: this.userID,
                        name: this.userID
                    }
                })
                this.self.context.setMyID(this.self.state.myID)
                this.self.context.setWs(this.self.state.ws)
            } else if (type == 'newList') {
                this.self.context.setList(data)
            } else if (type == 'newUser') {
                this.self.state.messages.push({
                    _id: uuidv4(),
                    text: `${data}加入聊天室`,
                    createdAt: new Date(),
                    system: true
                })
                this.self.setState({
                    messages: this.self.state.messages
                })
            } else if (type == 'removeUser') {
                this.self.state.messages.push({
                    _id: uuidv4(),
                    text: `${data}离开聊天室`,
                    createdAt: new Date(),
                    system: true
                })
                this.self.setState({
                    messages: this.self.state.messages
                })
            }
        } else if (how == 'user') {  //点对点通讯
            let arr = this.self.context.chatList,
                flag = false
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name == type) {
                    arr[i].messages.push(...data)
                    this.self.context.setChatList(arr)
                    flag = true
                    return
                }
            }
            if (!false) {
                arr.push({
                    name: type,
                    messages: [...data]
                })
                this.self.context.setChatList(arr)
            }
            if (this.self2) {
                if(type == this.self2.state.how){
                    this.self2.state.messages.push(...data)
                    this.self2.setState({
                        messages: this.self2.state.messages
                    })
                }
            }
        }
    }

    changeUser = (user) => {
        this.self2 = user
    }

    send(how = null, data = null, type = null) {
        let obj = {
            how,
            type,
            data
        }
        let datas = JSON.stringify(obj)
        this.ws.send(datas)
    }
    close() {
        this.ws.close()
    }
}

export default WS