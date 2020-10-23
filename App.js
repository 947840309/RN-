/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import Home from './src/zujian/home.js';
import Me from './src/zujian/me.js';
import List from './src/zujian/list.js'



export default class App extends Component {
  static childContextTypes = {
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
      selectedTab: 'comments',
      suerList: [],
      myID: {},
      ws: {},
      chatList: []
    }
  }

  getChildContext = () => {
    return {
      suerList: this.state.suerList,
      setList: (arr) => {
        this.setState({
          suerList: arr
        })
      },
      myID: this.state.myID,
      setMyID: (obj) => {
        this.setState({
          myID: obj
        })
      },
      ws: this.state.ws,
      setWs: (obj) => {
        this.setState({
          ws: obj
        })
      },
      chatList: this.state.chatList,
      setChatList: (arr) => {
        this.setState({
          chatList: arr
        })
      }
    }
  }

  render() {
    return (
      <View style={style.container}>
        <TabNavigator tabBarStyle={style.tabBarStyle}>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'comments'}
            title="聊天室"
            renderIcon={() => <Icon name="comments" size={28} color="gray" />}
            renderSelectedIcon={() => <Icon name="comments" size={28} color="#0079FF" />}
            onPress={() => this.setState({ selectedTab: 'comments' })}>
            <Home></Home>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'comment-o'}
            title="消息列表"
            renderIcon={() => <Icon name="comment-o" size={28} color="gray" />}
            renderSelectedIcon={() => <Icon name="comment-o" size={28} color="#0079FF" />}
            onPress={() => this.setState({ selectedTab: 'comment-o' })}>
            <List navigation={this.props.navigation} ></List>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            title="在线用户"
            renderIcon={() => <Icon name="user" size={28} color="gray" />}
            renderSelectedIcon={() => <Icon name="user" size={28} color="#0079FF" />}
            onPress={() => this.setState({ selectedTab: 'profile' })}>
            <Me navigation={this.props.navigation} ></Me>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}


const style = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBarStyle: {
    height: 55
  }
})