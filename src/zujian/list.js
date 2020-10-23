import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import PropTypes from 'prop-types';
import Moment from 'moment' 

class List extends Component {

    static contextTypes = {
        chatList: PropTypes.array,
        setChatList: PropTypes.func,
        myID: PropTypes.object,
        ws: PropTypes.object
    }

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.context.chatList}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: '100%', paddingLeft: 10, paddingTop: 5, paddingBottom: 5, justifyContent: 'center' }} onTouchEnd={() => { this.props.navigation.navigate('Liao', { myID: this.context.myID, ws: this.context.ws, how: item.name, messages: item.messages}) }}>
                                <View style={{position: 'relative',width: '100%',height: 25}}>
                                    <Text style={{ fontSize: 18, position: 'absolute'}}>{item.name}</Text>
                                    <Text style={{ fontSize: 12, color: '#999', position: 'absolute', right: 5, top: 10}}>{Moment.utc(item.messages[item.messages.length-1].createdAt).local().format('LT')}</Text>
                                </View>
                                <Text style={{ fontSize: 12, paddingLeft: 35, color: '#999' }}>{item.messages[item.messages.length-1].text}</Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.userID}
                    ItemSeparatorComponent={() => <View style={{ width: '90%', height: 1, backgroundColor: '#ccc', alignSelf: 'center' }} />}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: 40}}>
                                <Text style={{ fontSize: 15, color: '#999'}}>未与其他用户联系...</Text>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}

export default List