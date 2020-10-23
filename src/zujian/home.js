import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GiftedChat } from 'react-native-gifted-chat';
import { Kaede } from 'react-native-textinput-effects';
import { View, Alert, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import webS from './ws.js';
import { v4 as uuidv4 } from 'uuid';

const url = 'ws://ws.happydouble.xyz'
export default class Hmoe extends Component {

  static contextTypes = {
    suerList: PropTypes.array,
    setList: PropTypes.func,

    myID: PropTypes.object,
    setMyID: PropTypes.func,

    ws: PropTypes.object,
    setWs: PropTypes.func,

    chatList: PropTypes.array,
    setChatList: PropTypes.func
  }
  
  constructor(props) {
    super(props)
    this.state = {
      myID: {
        avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=264986648,3480936303&fm=26&gp=0.jpg',
        _id: null,
        name: null
      },
      messages: [{
        _id: uuidv4(),
        text: '连接完成',
        createdAt: new Date(),
        system: true
      }],
      flag: false,
      loginFlag: false,
      ws: null,
      ZT: '正在连接服务器...',
      userName: ''
    }
  }

  componentDidMount() {

  }

  componentWillUnmount(){
    if(this.state.ws != null){
      this.onSend('server',this.state.userName,'closer')
      this.state.ws.close()
    }
    console.log('应用关闭')
  }

  render() {
    return this.shwo()
  }

  onSend = (how,messages,type) => {
    this.state.ws.send(how, messages, type)
  }

  openAlert = (Title, data, arr) => {
    Alert.alert(Title, data, arr)
  }

  shwo = () => {
    let oStyle = ''
    if (this.state.loginFlag) {
      oStyle = styles.container
    } else {
      oStyle = styles.zindex
    }
    if (!this.state.flag) {
      return (
        <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <View style={oStyle} >
            <ActivityIndicator size={70} color="#00ff00" animating={this.state.loginFlag} />
            <Text style={{ color: '#fff', marginTop: 10 }}>{this.state.ZT}</Text>
          </View>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>
            输入一个响亮的名字
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 10, }}>
            方便朋友找到你
          </Text>
          <Kaede style={{ width: '100%' }}
            label={'userID'}
            inputPadding={16}
            onChangeText={async (text) => {
              await this.setState({
                userName: text
              })
            }}
          />
          <View style={{ width: 60, height: 60, marginTop: 10 }}>
            <Icon.Button name='arrow-right'
              borderRadius={30} size={30} style={{ width: '100%', height: '100%' }}
              iconStyle={{ marginLeft: 9 }}
              onPress={() => {
                if(this.state.userName == '') return
                if (this.state.ws == null) {
                  this.setState({ loginFlag: true })
                  this.setState({
                    ws: new webS(this.state.userName, url, this)
                  })
                }else{
                  this.onSend('server', this.state.userName, 'userID')
                }
              }}>
            </Icon.Button>
          </View>
        </View>
      )
    } else {
      return (
        <GiftedChat
          user={this.state.myID}
          messages={this.state.messages}
          showUserAvatar={true}
          renderAvatarOnTop={true}
          onSend={(e) => {
            this.onSend('users',e)
          }}
          inverted={false}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 5
  },
  zindex: {
    display: 'none'
  }
})