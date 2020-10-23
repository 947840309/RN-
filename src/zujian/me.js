import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';


export default class Me extends Component {
    
    static contextTypes = {
        suerList: PropTypes.array,
        setList: PropTypes.func,
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
                    data={this.context.suerList}
                    renderItem={({ item }) => {
                        return (
                            <View style={{width: '100%' , height: 40, paddingLeft: 5, justifyContent: 'center'}}  onTouchEnd={() => {this.props.navigation.navigate('Liao',{myID: this.context.myID, ws: this.context.ws, how: item.userID})}}>
                                <Text style={{fontSize: 18}}>{item.userID}</Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.userID}
                    ItemSeparatorComponent={() => <View style={{ width: '90%', height: 1, backgroundColor: '#ccc', alignSelf: 'center'}} />}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 15, color: '#999'}}>没有其他用户在线...</Text>
                            </View>
                        )
                    }}
                    ListFooterComponent={() => {
                        return (
                            <View style={{ width: '100%', alignItems: 'center'}}>
                                <Text style={{ fontSize: 12, color: '#999' }}>当前在线人数: {this.context.suerList.length}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}