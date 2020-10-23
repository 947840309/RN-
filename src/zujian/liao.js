import React, { Component, } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

class Liao extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            messages: this.props.route.params.messages ? this.props.route.params.messages : [],
            myID: this.props.route.params.myID,
            ws: this.props.route.params.ws,
            how: this.props.route.params.how
        }
    }

    componentWillMount() {
        // console.log(this.state.how)

    }

    onSend = (how, messages, type) => {
        this.state.ws.changeUser(this)
        this.state.ws.send(how, messages, type)
    }

    render() {
        return (
            <GiftedChat
                user={this.state.myID}
                messages={this.state.messages}
                showUserAvatar={true}
                renderAvatarOnTop={true}
                onSend={(e) => {
                    this.onSend('user', e, this.state.how)
                    this.state.messages.push(...e)
                    this.setState({
                        messages: this.state.messages
                    })
                }}
                inverted={false}
            />
        )
    }
}

export default Liao